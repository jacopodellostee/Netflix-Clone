import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import routes from '../routes/routes'

import NetflixLogo from '../assets/NetflixLogo.png';
import HamburgerMenuOpen from '../assets/hamburger-menu.svg';
import HamburgerMenuClosed from '../assets/cross.svg';

export default function Nav() {

    const [isOpen, setIsOpen] = useState(false)

    const handleMobileLinkClick = () => {
        setIsOpen(false)
    }

    const getNavLinkClass = ({ isActive }) => isActive ? 'text-white font-bold' : 'text-white hover:text-gray-400 transition-colors'

    const navLinks = routes[0].children.filter((el) => el.showInNav).map((el, index) => (
            <NavLink key={el.path ?? index} to={el.path ?? '/'} className={getNavLinkClass}>
                {el.title}
            </NavLink>
    ))

    const mobileNavLinks = routes[0].children.filter((el) => el.showInNav).map((el, index) => (
            <NavLink key={el.path ?? index} to={el.path ?? '/'} className={(props) => `${getNavLinkClass(props)} text-2xl font-medium`} onClick={handleMobileLinkClick}>
                {el.title}
            </NavLink>
    ))

    return (
        <>
            <nav className="w-full bg-black px-4 md:px-8 sticky top-0 z-50 h-[70px] flex items-center shadow-md">
                <div className="w-full flex items-center justify-between h-full">
                    
                    <NavLink to="/" onClick={handleMobileLinkClick} className="h-full flex items-center">
                        <img 
                            src={NetflixLogo} 
                            alt="Netflix Logo" 
                            className="max-h-[45px] w-auto object-contain" 
                        />
                    </NavLink>

                    <div className="hidden md:flex items-center gap-5">
                        {navLinks}
                    </div>
                    <div className="md:hidden flex items-center">
                        {/* Hamburger menu open */}
                        <button onClick={() => setIsOpen(true)} className="text-white focus:outline-none flex items-center justify-center" aria-label="Open menu">
                            <img src={HamburgerMenuOpen} alt="Open Menu" className="w-8 h-8"/>
                        </button>
                    </div>
                </div>
            </nav>


            <div className={`md:hidden fixed inset-0 z-50 bg-black transform transition-all duration-300 ease-out ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-full'} `}>
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                    {/* Hamburger menu closed */}
                    <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 md:right-8 text-white focus:outline-none p-2" aria-label="Close menu">
                        <img src={HamburgerMenuClosed} alt="Close Menu" className="w-8 h-8"/>
                    </button>
                    <div className="flex flex-col items-center gap-8">
                        {mobileNavLinks}
                    </div>
                </div>
            </div>
        </>
    )
}