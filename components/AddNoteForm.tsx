'use client'

import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddNoteForm() {
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [subject, setSubject] = useState('')
    const [semester, setSemester] = useState(1)
    const [category, setCategory] = useState('semester-notes')
    const [content, setContent] = useState('')
    const [isPremium, setIsPremium] = useState(false)
    const [fileUrl, setFileUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const supabase = createClient()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        const { error } = await supabase
            .from('notes')
            .insert([
                {
                    title,
                    slug,
                    subject,
                    semester,
                    category,
                    content,
                    is_premium: isPremium,
                    file_url: fileUrl || null,
                }
            ])

        if (error) {
            setMessage('Error: ' + error.message)
        } else {
            setMessage('Note added successfully!')
            // Reset form
            setTitle('')
            setSlug('')
            setSubject('')
            setCategory('semester-notes')
            setContent('')
            setFileUrl('')
            router.refresh()
        }
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                        setSlug(e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''))
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Slug</label>
                <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        required
                        placeholder="e.g. Pharmacology"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Semester</label>
                    <input
                        type="number"
                        value={semester}
                        onChange={(e) => setSemester(parseInt(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        required
                        min={1}
                        max={10}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    required
                >
                    <option value="semester-notes">Semester Notes</option>
                    <option value="module-notes">Module Notes</option>
                    <option value="subject-notes">Subject Notes</option>
                    <option value="pyq-solved">PYQ Solved</option>
                    <option value="quick-revision">Quick Revision</option>
                    <option value="case-studies">Case Studies</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    required
                    placeholder="Write your note content here..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">File URL (Optional)</label>
                <input
                    type="text"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    placeholder="https://example.com/file.pdf"
                />
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="isPremium"
                    checked={isPremium}
                    onChange={(e) => setIsPremium(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isPremium" className="ml-2 block text-sm text-gray-900">
                    Premium Content
                </label>
            </div>

            {message && (
                <p className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                    {message}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
                {loading ? 'Adding...' : 'Add Note'}
            </button>
        </form>
    )
}
