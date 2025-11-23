'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { createClient } from '@/utils/supabase/client'
import { Check } from 'lucide-react'

declare global {
    interface Window {
        Razorpay: any
    }
}

export default function PremiumPage() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleSubscribe = async (plan: 'monthly' | 'semester') => {
        setLoading(true)

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            router.push('/login?next=/premium')
            return
        }

        try {
            // 1. Create Order
            const response = await fetch('/api/razorpay/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ plan }),
            })

            if (!response.ok) {
                throw new Error('Failed to create order')
            }

            const order = await response.json()

            // 2. Open Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // We need to expose this
                amount: order.amount,
                currency: order.currency,
                name: 'Jiya Portfolio',
                description: `Premium Subscription - ${plan}`,
                order_id: order.id,
                handler: function (response: any) {
                    // Payment successful
                    // The webhook will handle the DB update
                    // We can just redirect to dashboard with a success flag
                    router.push('/dashboard?payment=success')
                },
                prefill: {
                    email: user.email,
                },
                theme: {
                    color: '#2563EB',
                },
            }

            const rzp = new window.Razorpay(options)
            rzp.open()
        } catch (error) {
            console.error('Payment error:', error)
            alert('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Upgrade to Premium</h1>
                <p className="text-xl text-gray-600">Unlock all study notes and exclusive content.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Monthly Plan */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:border-blue-500 transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-gray-100 px-4 py-1 rounded-bl-lg text-sm font-medium text-gray-600">
                        Flexible
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly</h3>
                    <div className="flex items-baseline mb-6">
                        <span className="text-4xl font-bold text-gray-900">₹49</span>
                        <span className="text-gray-500 ml-2">/month</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-gray-600">
                            <Check className="w-5 h-5 text-green-500 mr-3" />
                            Access to all premium notes
                        </li>
                        <li className="flex items-center text-gray-600">
                            <Check className="w-5 h-5 text-green-500 mr-3" />
                            Downloadable PDF files
                        </li>
                        <li className="flex items-center text-gray-600">
                            <Check className="w-5 h-5 text-green-500 mr-3" />
                            Cancel anytime
                        </li>
                    </ul>
                    <button
                        onClick={() => handleSubscribe('monthly')}
                        disabled={loading}
                        className="w-full py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Choose Monthly'}
                    </button>
                </div>

                {/* Semester Plan */}
                <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-600 p-8 transform md:-translate-y-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                        Best Value
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Semester</h3>
                    <div className="flex items-baseline mb-6">
                        <span className="text-4xl font-bold text-gray-900">₹99</span>
                        <span className="text-gray-500 ml-2">/6 months</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-gray-600">
                            <Check className="w-5 h-5 text-green-500 mr-3" />
                            Access to all premium notes
                        </li>
                        <li className="flex items-center text-gray-600">
                            <Check className="w-5 h-5 text-green-500 mr-3" />
                            Downloadable PDF files
                        </li>
                        <li className="flex items-center text-gray-600">
                            <Check className="w-5 h-5 text-green-500 mr-3" />
                            Save 50% vs Monthly
                        </li>
                    </ul>
                    <button
                        onClick={() => handleSubscribe('semester')}
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Choose Semester'}
                    </button>
                </div>
            </div>
        </div>
    )
}
