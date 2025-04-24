import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer
      className="relative bg-gray-900 text-gray-100 py-8 overflow-hidden"
      style={{ perspective: '1000px', transform: 'rotateX(2deg)' }}
    >
      {/* <!-- Depth layer (3D effect) --> */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: 'rotateX(15deg)',
          transformOrigin: 'top',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3), transparent)',
        }}
      ></div>

      <div className="relative container mx-auto">
        <div className="flex flex-wrap justify-between">
          {/* <!-- Brand Section --> */}
          <div className="w-full  align-baseline md:w-1/3 mb-8 md:mb-0 justify-baseline flex flex-col text-center">
            <div className="flex justify-center  ">
              <Image
                width={90}
                height={70}
                src={'/logo-tra.png'}
                alt="image of the logo"
              />
            </div>
            <h2 className="text-3xl font-bold mb-2">AngRod Designs</h2>
            <p className="text-sm text-gray-400">
              Where precision meets creativity.
            </p>
          </div>

          {/* <!-- Quick Links --> */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul>
              <li className="mb-2">
                <Link href="/">Home</Link>
              </li>
              <li className="mb-2">
                <Link href="/search">Store</Link>
              </li>
              <li className="mb-2">
                <Link href="/search/design">Designs</Link>
              </li>
              <li className="mb-2">
                <Link href="/search/printing">Printing</Link>
              </li>
              <li className="mb-2">
                <a href="/require-design">Require Design</a>
              </li>
            </ul>
          </div>

          {/* <!-- Contact Section --> */}
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
              Contact Us
            </h3>
            <p className="text-sm mb-1">La Vega Central, 4100</p>
            <p className="text-sm mb-1">Dominican Republic</p>
            <p className="text-sm mb-1">
              Phone:
              <a href="tel:1234567890">800-000-0000</a>
            </p>
            <p className="text-sm">
              Email:{' '}
              <Link href="mailto:sthefanyangeles00@gmail.com">
                sthefanyangeles00@gmail.com
              </Link>
            </p>
          </div>
        </div>

        {/* <!-- Bottom Footer --> */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-xs text-gray-500">
            &copy; 2025 AngRod Designs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
