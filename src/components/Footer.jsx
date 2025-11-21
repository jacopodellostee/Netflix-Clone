import { Link } from 'react-router-dom'

const footerLinks = [
    { text: 'Home', path: '/' },
    { text: 'Film', path: '/movies' },
    { text: 'Serie TV', path: '/tv' },
    { text: 'La mia Lista', path: '/favourites' },
    
    { text: 'Domande frequenti (FAQ)', href: '#' },
    { text: 'Centro assistenza', href: '#' },
    { text: 'Account', href: '#' },
    { text: 'Media Center', href: '#' },
    { text: 'Rapporti con gli investitori', href: '#' },
    { text: 'Opportunità di lavoro', href: '#' },
    { text: 'Condizioni di utilizzo', href: '#' },
    { text: 'Privacy', href: '#' },
    { text: 'Preferenze per i cookie', href: '#' },
    { text: 'Informazioni sull\'azienda', href: '#' },
    { text: 'Contattaci', href: '#' },
]

export default function Footer() {
    return (
        <footer className="w-full bg-black text-gray-400 py-12">
            
            <div className="container mx-auto px-4 md:px-8 max-w-5xl">
                

                <div className="mb-8">
                    <a href="#" className="hover:underline text-gray-400">
                        Domande? Contattaci.
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {footerLinks.map((link, index) => (
                        <div key={index}>
                            {link.path ? (
                                // Se esiste la proprietà 'path', usa il Link di React Router
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
                                    onClick={(e) => link.href === '#' && e.preventDefault()} // Previene scroll in alto se è '#'
                                >
                                    {link.text}
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                <div>
                    <p className="text-xs text-gray-500">
                        © 2025 Netflix Clone - Made for learning purposes
                    </p>
                </div>

            </div>
        </footer>
    )
}