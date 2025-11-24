import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import routes from '../routes/routes'

import NetflixLogo from '../assets/NetflixLogo.png';
import HamburgerMenuOpen from '../assets/hamburger-menu.svg';
import HamburgerMenuClosed from '../assets/cross.svg';

import SearchBar from './SearchBar';

export default function Nav() {

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const handleCloseMenu = () => {
        setIsOpen(false)
    }

    const getNavLinkClass = ({ isActive }) => isActive ? 'text-white font-bold' : 'text-white hover:text-gray-300 transition-colors'

    const navLinks = routes[0].children.filter((el) => el.showInNav).map((el, index) => (
        <NavLink key={el.path ?? index} to={el.path ?? '/'} className={getNavLinkClass}>
            {el.title}
        </NavLink>
    ))

    const mobileNavLinks = routes[0].children.filter((el) => el.showInNav).map((el, index) => (
        <NavLink
            key={el.path ?? index}
            to={el.path ?? '/'}
            className={(props) => `${getNavLinkClass(props)} text-xl font-medium`}
            onClick={handleCloseMenu}
        >
            {el.title}
        </NavLink>
    ))

    return (
        <>
            <nav className="w-full bg-black px-4 md:px-8 sticky top-0 z-50 h-[70px] flex items-center shadow-md shadow-black/50">
                <div className="w-full flex items-center justify-between h-full">

                    <NavLink to="/" onClick={handleCloseMenu} className="h-full flex items-center mr-6">
                        <img
                            src={NetflixLogo}
                            alt="Netflix Logo"
                            className="max-h-[35px] md:max-h-[45px] w-auto object-contain"
                        />
                    </NavLink>

                    <div className="hidden md:flex items-center gap-6 flex-1 justify-between">
                        <div className="flex items-center gap-6">
                            {navLinks}
                        </div>
                        <div className="w-64 lg:w-80">
                            <SearchBar />
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(true)} className="text-white focus:outline-none flex items-center justify-center p-1" aria-label="Open menu">
                            <img src={HamburgerMenuOpen} alt="Open Menu" className="w-7 h-7" />
                        </button>
                    </div>

                    <div className={`md:hidden fixed inset-0 z-50 bg-black transform transition-all duration-300 ease-out ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-[-10px] pointer-events-none'} `}>
                        <div className="relative w-full h-full flex flex-col pt-24 px-6 overflow-y-auto">

                            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-4 text-white focus:outline-none p-2" aria-label="Close menu">
                                <img src={HamburgerMenuClosed} alt="Close Menu" className="w-8 h-8" />
                            </button>

                            <div className="w-full mb-8">
                                <SearchBar onSearch={handleCloseMenu} />
                            </div>

                            <div className="flex flex-col items-center gap-6">
                                {mobileNavLinks}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>


        </>
    )
}