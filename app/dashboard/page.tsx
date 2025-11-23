import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Crown, Sparkles, Users, FileText, DollarSign, TrendingUp } from 'lucide-react'

export default async function Dashboard() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    const isAdmin = profile?.role === 'admin'

    const { data: subscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single()

    // Admin Analytics
    let analytics = null
    if (isAdmin) {
        const [
            { count: totalUsers },
            { count: totalNotes },
            { count: premiumNotes },
            { count: activeSubscriptions },
        ] = await Promise.all([
            supabase.from('profiles').select('*', { count: 'exact', head: true }),
            supabase.from('notes').select('*', { count: 'exact', head: true }),
            supabase.from('notes').select('*', { count: 'exact', head: true }).eq('is_premium', true),
            supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
        ])

        analytics = {
            totalUsers: totalUsers || 0,
            totalNotes: totalNotes || 0,
            premiumNotes: premiumNotes || 0,
            activeSubscriptions: activeSubscriptions || 0,
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            {/* Admin Analytics Section */}
            {isAdmin && analytics && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        Platform Analytics
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Total Users */}
                        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{analytics.totalUsers}</p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        {/* Total Notes */}
                        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total Notes</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{analytics.totalNotes}</p>
                                </div>
                                <div className="p-3 bg-green-100 rounded-full">
                                    <FileText className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </div>

                        {/* Premium Notes */}
                        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Premium Notes</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{analytics.premiumNotes}</p>
                                </div>
                                <div className="p-3 bg-amber-100 rounded-full">
                                    <Sparkles className="w-6 h-6 text-amber-600" />
                                </div>
                            </div>
                        </div>

                        {/* Active Subscriptions */}
                        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Active Subs</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{analytics.activeSubscriptions}</p>
                                </div>
                                <div className="p-3 bg-purple-100 rounded-full">
                                    <DollarSign className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions for Admin */}
                    <div className="mt-6 flex gap-3">
                        <Link
                            href="/admin"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                        >
                            Add New Note
                        </Link>
                        <Link
                            href="/notes"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                        >
                            View All Notes
                        </Link>
                    </div>
                </div>
            )}

            <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Full name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile?.name || user.email}</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
                        </div>
                        {isAdmin && (
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Role</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span className="px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                        <Crown className="w-3 h-3" />
                                        ADMIN
                                    </span>
                                </dd>
                            </div>
                        )}
                    </dl>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Subscription Status</h3>
                    {isAdmin && (
                        <span className="text-xs text-purple-600 font-medium">Full Access</span>
                    )}
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isAdmin ? (
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                            <Crown className="w-3 h-3" />
                                            ADMIN
                                        </span>
                                        <span className="text-xs text-gray-500">Unlimited access to all content</span>
                                    </div>
                                ) : subscription ? (
                                    <span className={`px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {subscription.status === 'active' && <Sparkles className="w-3 h-3" />}
                                        {subscription.status.toUpperCase()}
                                    </span>
                                ) : (
                                    <span className="text-gray-500">No active subscription</span>
                                )}
                            </dd>
                        </div>
                        {!isAdmin && subscription && (
                            <>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{new Date(subscription.start_date).toLocaleDateString()}</dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">End Date</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{new Date(subscription.end_date).toLocaleDateString()}</dd>
                                </div>
                            </>
                        )}
                        {!isAdmin && (!subscription || subscription.status !== 'active') && (
                            <div className="py-4 sm:py-5 sm:px-6">
                                <Link href="/premium" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Upgrade to Premium
                                </Link>
                            </div>
                        )}
                    </dl>
                </div>
            </div>

            <div className="mt-8">
                <form action="/auth/signout" method="post">
                    <button className="text-red-600 hover:text-red-800 font-medium">Sign out</button>
                </form>
            </div>
        </div>
    )
}
