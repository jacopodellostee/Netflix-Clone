import { Link } from 'react-router-dom'

const footerLinks = [
    { text: 'Home', path: '/' },
    { text: 'Movies', path: '/movies' },
    { text: 'TV Series', path: '/tv' },
    { text: 'Favourites', path: '/favourites' },
]

export default function Footer() {
    return (
        <footer className="w-full bg-black text-gray-400 py-12">

            <div className="container mx-auto px-4 md:px-8 max-w-5xl">


                <div className="mb-8">
                    <a href="#" className="hover:underline text-gray-400">
                        Requests? Contact us.
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {footerLinks.map((link, index) => (
                        <div key={index}>
                            {link.path ? (
                                <Link
                                    to={link.path}
                                    className="text-sm hover:underline decoration-gray-400 block mb-1"
                                >
                                    {link.text}
                                </Link>
                            ) : (
                                <a
                                    href={link.href}
                                    className="text-sm hover:underline decoration-gray-400 block mb-1"
                                    onClick={(e) => link.href === '#' && e.preventDefault()}
                                >
                                    {link.text}
                                </a>
                            )}
                        </div>
                    ))}
                    
                </div>

                <div className='flex justify-between'>
                    <p className="text-xs text-gray-500">
                        © 2025 Netflix Clone - Made by Jacopo Dell'Oste and Matteo Paglietta for learning purposes
                    </p>
                    <a
                        href="https://github.com/jacopodellostee/Netflix-Clone"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Go to repository GitHub"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                        </svg>
                    </a>
                </div>

            </div>
        </footer>
    )
}