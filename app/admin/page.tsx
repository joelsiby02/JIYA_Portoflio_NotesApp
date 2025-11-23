import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AddNoteForm from '@/components/AddNoteForm'

export default async function AdminPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (!profile || profile.role !== 'admin') {
        redirect('/')
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Note</h2>
                <AddNoteForm />
            </div>
        </div>
    )
}
