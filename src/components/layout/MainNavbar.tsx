import { useState } from 'react';
import { FaHome, FaUser, FaCog, FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

import { RefObject } from 'react';

interface MainNavbarProps {
  seccionPrincipalRef: RefObject<HTMLElement | null>;
  quienesSomosRef: RefObject<HTMLElement | null>;
  serviciosRef: RefObject<HTMLElement | null>;
  scrollToSection: (ref: RefObject<HTMLElement | null>) => void;
}

const MainNavbar: React.FC<MainNavbarProps> = ({
  seccionPrincipalRef,
  quienesSomosRef,
  serviciosRef,
  scrollToSection,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // This function wraps the scroll and closes the mobile menu when clicked
  const handleMenuClick = (ref: RefObject<HTMLElement | null>) => {
    scrollToSection(ref);
    toggleMenu();
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-gray-950 text-[#D9D9D9]"
      data-aos="fade-down"
      data-aos-delay="100"
    >
      <nav className="container mx-auto flex justify-between items-center  px-4">
        <div>
          <button onClick={() => scrollToSection(seccionPrincipalRef)}>
            <Image
              width={90}
              height={70}
              src={'/logo-tra.png'}
              alt="image of the logo"
            />
          </button>
        </div>
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8">
          <button
            onClick={() => scrollToSection(seccionPrincipalRef)}
            className="flex items-center gap-2 hover:text-[#f1cca3] hover:scale-110 transition-all duration-200"
          >
            <FaHome /> <span>Home</span>
          </button>
          <button
            onClick={() => scrollToSection(quienesSomosRef)}
            className="flex items-center gap-2 hover:text-[#f1cca3] hover:scale-110 transition-all duration-200"
          >
            <FaUser /> <span>About</span>
          </button>
          <button
            onClick={() => scrollToSection(serviciosRef)}
            className="flex items-center gap-2 hover:text-[#f1cca3] hover:scale-110 transition-all duration-200"
          >
            <FaCog /> <span>Services</span>
          </button>
        </div>
        {/* Mobile menu button (visible only on small screens) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>
      {/* Dropdown menu for mobile */}
      {menuOpen && (
        <div className="md:hidden bg-gray-950 transition-all duration-300">
          <div className="flex flex-col items-center space-y-4 py-4">
            <button
              onClick={() => handleMenuClick(seccionPrincipalRef)}
              className="flex items-center gap-2 hover:text-[#f1cca3] hover:scale-110 transition-all duration-200"
            >
              <FaHome /> <span>Home</span>
            </button>
            <button
              onClick={() => handleMenuClick(quienesSomosRef)}
              className="flex items-center gap-2 hover:text-[#f1cca3] hover:scale-110 transition-all duration-200"
            >
              <FaUser /> <span>About</span>
            </button>
            <button
              onClick={() => handleMenuClick(serviciosRef)}
              className="flex items-center gap-2 hover:text-[#f1cca3] hover:scale-110 transition-all duration-200"
            >
              <FaCog /> <span>Services</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainNavbar;
