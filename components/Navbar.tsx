import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { ThemeToggle } from './ThemeToggle'

export default async function Navbar() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let isAdmin = false
    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        isAdmin = profile?.role === 'admin'
    }

    return (
        <nav className="w-full border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Jiya<span className="text-blue-600">.</span>
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                        Home
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                        About
                    </Link>
                    <Link href="/notes" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                        Notes
                    </Link>
                    {!isAdmin && (
                        <Link href="/premium" className="text-sm font-medium text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
                            Premium
                        </Link>
                    )}
                    <Link href="/contact" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                        Contact
                    </Link>
                    {isAdmin && (
                        <Link href="/admin" className="text-sm font-medium text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 transition-colors">
                            Add Notes
                        </Link>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    {user ? (
                        <Link href="/dashboard" className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
                            Dashboard
                        </Link>
                    ) : (
                        <Link href="/login" className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}
