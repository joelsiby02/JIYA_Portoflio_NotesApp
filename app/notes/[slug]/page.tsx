import { createClient } from '@/utils/supabase/server'
import { Note } from '@/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Lock } from 'lucide-react'

export default async function NotePage({ params }: { params: { slug: string } }) {
    const { slug } = await params
    const supabase = await createClient()

    const { data: note } = await supabase
        .from('notes')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!note) {
        notFound()
    }

    const typedNote = note as Note

    // Check access
    let hasAccess = !typedNote.is_premium

    if (typedNote.is_premium) {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            // Check if user is admin
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single()

            // Admin has access to everything
            if (profile?.role === 'admin') {
                hasAccess = true
            } else {
                // Check for active subscription
                const { data: subscription } = await supabase
                    .from('subscriptions')
                    .select('status')
                    .eq('user_id', user.id)
                    .eq('status', 'active')
                    .single()

                if (subscription) {
                    hasAccess = true
                }
            }
        }
    }

    if (!hasAccess) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Premium Content</h1>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    This note is locked for premium members. Please upgrade your account to access this content.
                </p>
                <Link
                    href="/dashboard"
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Subscribe Now
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-16">
            <div className="mb-8">
                <Link href="/notes" className="text-sm text-gray-500 hover:text-gray-900 mb-4 block">
                    ← Back to Notes
                </Link>
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                        {typedNote.subject}
                    </span>
                    <span className="text-sm text-gray-500">Semester {typedNote.semester}</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-6">{typedNote.title}</h1>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700">
                {/* Simple rendering of content. For markdown, we'd need a parser. */}
                <div className="whitespace-pre-wrap">{typedNote.content}</div>
            </div>

            {typedNote.file_url && (
                <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Attached File</h3>
                    <a
                        href={typedNote.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Download / View File
                    </a>
                </div>
            )}
        </div>
    )
}
