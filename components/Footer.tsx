export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-100 bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <p className="text-sm text-gray-500">© {new Date().getFullYear()} Jiya. All rights reserved.</p>
                </div>
                <div className="flex space-x-6">
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Twitter</span>
                        {/* Icon placeholder */}
                        Twitter
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">LinkedIn</span>
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    )
}
