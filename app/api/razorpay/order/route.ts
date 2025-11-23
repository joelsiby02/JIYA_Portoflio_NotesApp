import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'mock_key',
        key_secret: process.env.RAZORPAY_KEY_SECRET || 'mock_secret',
    })

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { plan } = await request.json()

    let amount = 0
    let currency = 'INR'

    if (plan === 'monthly') {
        amount = 4900 // ₹49.00 in paise
    } else if (plan === 'semester') {
        amount = 9900 // ₹99.00 in paise
    } else {
        return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const options = {
        amount: amount,
        currency: currency,
        receipt: `receipt_${Date.now()}`,
        notes: {
            user_id: user.id,
            plan: plan,
        },
    }

    try {
        const order = await razorpay.orders.create(options)
        return NextResponse.json(order)
    } catch (error) {
        console.error('Error creating Razorpay order:', error)
        return NextResponse.json({ error: 'Error creating order' }, { status: 500 })
    }
}
