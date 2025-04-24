'use client';

import { RefObject, useEffect } from 'react';
import Image from 'next/image';
import { Menu } from '@/lib/shopify/types';

interface ServicesSectionProps {
  serviciosRef: RefObject<HTMLDivElement | null>;
  menus: Menu[];
}

export default function ServicesSection({
  serviciosRef,
  menus,
}: ServicesSectionProps) {
  useEffect(() => {
    console.log('Menu:', menus[1]?.path);
  }, [menus]);

  return (
    <section
      className="min-h-screen py-45 px-6 bg-gray-950 text-white"
      id="servicios"
      ref={serviciosRef}
    >
      <h2 className="text-5xl font-bold text-center mb-10" data-aos="fade-up">
        Our Services
      </h2>
      <div className="max-w-8xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Card: Require 3D Design */}
        <div
          className="group relative h-100 rounded overflow-hidden shadow-2xl transform  "
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="relative w-full h-full">
            <Image
              src="/diseno.jpg"
              alt="Diseño 3D"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-[#3a0d0d]  opacity-80 md:opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500">
            <h3
              className="text-3xl font-bold text-white text-center transition-transform duration-500 transform translate-y-0 group-hover:-translate-y-1  md:translate-y-15  "
              style={{ textShadow: '1px 1px 10px rgba(1, 1, 1, 0.8)' }}
            >
              Require 3D Design
            </h3>
            <div className="opacity-100 md:opacity-0  group-hover:opacity-100  transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 text-center px-4">
              <p className="mb-4 text-[#f1cca3]">
                Product modeling, architectural visualizations, and 3D
                industrial design.{' '}
              </p>
              <a
                href={menus[0]?.path}
                className="inline-block bg-[#f1cca3] text-[#3a0d0d] px-4 py-2 rounded hover:bg-[#f8d6b0] transition-colors duration-300"
              >
                {menus[0]?.title}
              </a>
            </div>
          </div>
        </div>
        {/* Card: Online Store */}
        <div
          className="group relative h-100 rounded overflow-hidden shadow-lg transform transition-transform duration-300 "
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="relative w-full h-full">
            <Image
              src="/productos.jpg"
              alt="Consultoría Técnica"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-[#3a0d0d]  opacity-80 md:opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500">
            <h3
              className="text-3xl font-bold text-white text-center transition-transform duration-500 transform translate-y-0 group-hover:-translate-y-1  md:translate-y-15  "
              style={{ textShadow: '1px 1px 10px rgba(1, 1, 1, 0.8)' }}
            >
              Visit Our Online Store
            </h3>
            <div className="opacity-100 md:opacity-0  group-hover:opacity-100  transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 text-center px-4">
              <p className="mb-4 text-[#f1cca3]">
                Nothing in mind? Visit our online store and discover our
                existing catalog.{' '}
              </p>
              <a
                href={menus[2]?.path}
                className="inline-block bg-[#f1cca3] text-[#3a0d0d] px-4 py-2 rounded hover:bg-[#f8d6b0] transition-colors duration-300"
              >
                {menus[2]?.title}
              </a>
            </div>
          </div>
        </div>
        {/* Card: Require 3D Printing */}
        <div
          className="group relative h-100 rounded overflow-hidden shadow-lg transform transition-transform duration-300 "
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="relative w-full h-full">
            <Image
              src="/impresion.jpg"
              alt="Impresión 3D"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-[#3a0d0d]  opacity-80 md:opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500">
            <h3
              className="text-3xl font-bold text-white text-center transition-transform duration-500 transform translate-y-0 group-hover:-translate-y-1  md:translate-y-15  "
              style={{ textShadow: '1px 1px 10px rgba(1, 1, 1, 0.8)' }}
            >
              Require 3D Printing
            </h3>
            <div className="opacity-100 md:opacity-0  group-hover:opacity-100  transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 text-center px-4">
              <p className="mb-4 text-[#f1cca3]">
                Prototype printing services, custom parts, and low-volume
                production.{' '}
              </p>
              <a
                href={menus[1]?.path}
                className="inline-block bg-[#f1cca3] text-[#3a0d0d] px-4 py-2 rounded hover:bg-[#f8d6b0] transition-colors duration-300"
              >
                {menus[1]?.title}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
