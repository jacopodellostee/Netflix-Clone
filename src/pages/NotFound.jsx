import { Link } from 'react-router-dom';

import NetflixLogo from '../assets/NetflixLogo.png';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <div className="mb-8">
                <img
                    src={NetflixLogo}
                    alt="Netflix Logo"
                    className="max-h-[35px] md:max-h-[45px] w-auto object-contain"
                />
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-red-600 mb-4 animate-bounce">
                404
            </h1>
            <p className="text-xl md:text-3xl text-white text-center mb-6">
                Page not found. It appears this title is unavailable.
            </p>
            <p className="text-lg md:text-xl text-gray-400 text-center mb-8 max-w-2xl">
                Maybe the page you're looking for has been removed, its name has changed, or it never existed.
            </p>

            <Link
                to="/"
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors duration-300 text-lg md:text-xl shadow-lg"
            >
                Go Back to Home
            </Link>

        </div>
    );
}