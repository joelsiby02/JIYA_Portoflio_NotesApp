'use client'

import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface NavbarProps {
    user: any
    isAdmin: boolean
}

export function NavbarClient({ user, isAdmin }: NavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Close mobile menu when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <nav className="w-full border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Jiya<span className="text-blue-600">.</span>
                </Link>

                {/* Desktop Navigation */}
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

                {/* Desktop Right Side */}
                <div className="hidden md:flex items-center space-x-4">
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

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center space-x-4">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <div className="px-4 py-4 space-y-3">
                        <Link
                            href="/"
                            className="block py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="block py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/notes"
                            className="block py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Notes
                        </Link>
                        {!isAdmin && (
                            <Link
                                href="/premium"
                                className="block py-2 text-sm font-medium text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Premium
                            </Link>
                        )}
                        <Link
                            href="/contact"
                            className="block py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        {isAdmin && (
                            <Link
                                href="/admin"
                                className="block py-2 text-sm font-medium text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Add Notes
                            </Link>
                        )}
                        <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                            {user ? (
                                <Link
                                    href="/dashboard"
                                    className="block py-2 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="block py-2 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
