export type Note = {
    id: string
    title: string
    slug: string
    subject: string
    semester: number
    category: string
    content: string
    is_premium: boolean
    file_url: string | null
    created_at: string
}

export type Profile = {
    id: string
    name: string
    email: string
    created_at: string
}

export type Subscription = {
    id: string
    user_id: string
    status: string
    start_date: string
    end_date: string
}
