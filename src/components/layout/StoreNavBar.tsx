'use client';
import CartModal from '@/components/cart/CartModal';
import Search from './store/SearchBar';
import ReturnButton from '@/components/ui/ReturnButton';

export function NavBar() {
  return (
    <header
      className=" z-50 pt-10 bg-gray-950 pb-8"
      data-aos="fade-down"
      data-aos-delay="100"
    >
      <nav className="container mx-auto flex justify-between items-center  px-4">
        <div>
          <ReturnButton />
        </div>
        {/* Menu for desktop */}
        <div className="hidden md:flex w-1/2">
          <Search />
        </div>
        <div>
          <CartModal />
        </div>
      </nav>
      {/* Menu for movil */}
      <div className="md:hidden ">
        <div className="flex flex-col items-center container mx-auto pt-8 px-8">
          <Search />
        </div>
      </div>
    </header>
  );
}
