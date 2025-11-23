'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, resolvedTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800" />
        )
    }

    const currentTheme = resolvedTheme || theme

    const handleToggle = () => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)

        // Force DOM update for Chrome compatibility
        if (typeof window !== 'undefined') {
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        }
    }

    return (
        <button
            onClick={handleToggle}
            className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
        >
            {currentTheme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
                <Moon className="w-5 h-5 text-gray-700" />
            )}
        </button>
    )
}
