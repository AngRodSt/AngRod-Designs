'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function ReturnButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-white mx-4 text-center w-30 rounded-2xl h-8 relative text-w text-sm font-semibold border-4 border-white group"
    >
      <div className="bg-[#f1cca3] rounded-xl h-6 w-1/4 grid place-items-center absolute left-0 top-0 group-hover:w-full group-hover:bg-[#3a0d0d] z-10 duration-500">
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffff"
            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
          />
          <path
            fill="#ffff"
            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
          />
        </svg>
      </div>
      <p className="translate-x-4">Go Home</p>
    </button>
  );
}
