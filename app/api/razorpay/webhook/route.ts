import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

// We need a service role client to bypass RLS for the webhook
// Since we can't use the standard server client which relies on cookies
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Fallback to anon if service role not set, but service role is better for writes
)

export async function POST(request: Request) {
    const body = await request.text()
    const signature = request.headers.get('x-razorpay-signature')

    if (!signature) {
        return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
        .update(body)
        .digest('hex')

    if (expectedSignature !== signature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)

    if (event.event === 'payment.captured') {
        const payment = event.payload.payment.entity
        const notes = payment.notes
        const userId = notes.user_id
        const plan = notes.plan

        if (userId) {
            // Calculate end date
            const startDate = new Date()
            const endDate = new Date()
            if (plan === 'monthly') {
                endDate.setMonth(endDate.getMonth() + 1)
            } else if (plan === 'semester') {
                endDate.setMonth(endDate.getMonth() + 6)
            }

            // Check for existing subscription
            const { data: existingSubscription } = await supabaseAdmin
                .from('subscriptions')
                .select('id')
                .eq('user_id', userId)
                .single()

            let error
            if (existingSubscription) {
                const { error: updateError } = await supabaseAdmin
                    .from('subscriptions')
                    .update({
                        status: 'active',
                        start_date: startDate.toISOString(),
                        end_date: endDate.toISOString(),
                    })
                    .eq('user_id', userId)
                error = updateError
            } else {
                const { error: insertError } = await supabaseAdmin
                    .from('subscriptions')
                    .insert({
                        user_id: userId,
                        status: 'active',
                        start_date: startDate.toISOString(),
                        end_date: endDate.toISOString(),
                    })
                error = insertError
            }

            if (error) {
                console.error('Error updating subscription:', error)
                return NextResponse.json({ error: 'Database error' }, { status: 500 })
            }
        }
    }

    return NextResponse.json({ status: 'ok' })
}
