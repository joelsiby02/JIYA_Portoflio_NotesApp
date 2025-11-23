'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { Note } from '@/types'
import { Lock, Filter } from 'lucide-react'

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([])
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([])
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedSemester, setSelectedSemester] = useState('all')
    const [loading, setLoading] = useState(true)

    const supabase = createClient()

    useEffect(() => {
        fetchNotes()
    }, [])

    useEffect(() => {
        filterNotes()
    }, [selectedCategory, selectedSemester, notes])

    const fetchNotes = async () => {
        const { data } = await supabase
            .from('notes')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) {
            setNotes(data as Note[])
        }
        setLoading(false)
    }

    const filterNotes = () => {
        let filtered = notes

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(note => note.category === selectedCategory)
        }

        if (selectedSemester !== 'all') {
            filtered = filtered.filter(note => note.semester === parseInt(selectedSemester))
        }

        setFilteredNotes(filtered)
    }

    const categories = [
        { value: 'all', label: 'All Categories' },
        { value: 'semester-notes', label: 'Semester Notes' },
        { value: 'module-notes', label: 'Module Notes' },
        { value: 'subject-notes', label: 'Subject Notes' },
        { value: 'pyq-solved', label: 'PYQ Solved' },
        { value: 'quick-revision', label: 'Quick Revision' },
        { value: 'case-studies', label: 'Case Studies' },
    ]

    const semesters = [
        { value: 'all', label: 'All Semesters' },
        ...Array.from({ length: 6 }, (_, i) => ({
            value: String(i + 1),
            label: `Semester ${i + 1}`
        }))
    ]

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Study Notes</h1>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Filter className="w-4 h-4" />
                        <span className="font-medium">Filter by:</span>
                    </div>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                        {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>

                    <select
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                        {semesters.map(sem => (
                            <option key={sem.value} value={sem.value}>{sem.label}</option>
                        ))}
                    </select>

                    {(selectedCategory !== 'all' || selectedSemester !== 'all') && (
                        <button
                            onClick={() => {
                                setSelectedCategory('all')
                                setSelectedSemester('all')
                            }}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">Loading notes...</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNotes.map((note) => (
                            <Link
                                key={note.id}
                                href={`/notes/${note.slug}`}
                                className="group block bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition-all"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                                            {note.subject}
                                        </span>
                                        <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                                            {note.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </span>
                                    </div>
                                    {note.is_premium && (
                                        <Lock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                    )}
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {note.title}
                                </h2>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                    {note.content}
                                </p>
                                <div className="flex items-center text-sm text-gray-400">
                                    <span>Semester {note.semester}</span>
                                    <span className="mx-2">•</span>
                                    <span>{new Date(note.created_at).toLocaleDateString()}</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filteredNotes.length === 0 && (
                        <p className="text-center text-gray-500 py-12">
                            No notes found{selectedCategory !== 'all' || selectedSemester !== 'all' ? ' with the selected filters' : ''}.
                        </p>
                    )}
                </>
            )}
        </div>
    )
}
