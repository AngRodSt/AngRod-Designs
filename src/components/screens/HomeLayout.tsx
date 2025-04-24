'use client';

import { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HomeSection from '@/components/screens/HomeSection';
import AboutSection from '@/components/screens/AboutSection';
import ServicesSection from '@/components/screens/ServicesSection';
import MainNavbar from '@/components/layout/MainNavbar';
import { Menu } from '@/lib/shopify/types';

export default function Home({ menus }: { menus: Menu[] }) {
  const serviciosRef = useRef<HTMLDivElement>(null);
  const quienesSomosRef = useRef<HTMLDivElement>(null);
  const seccionPrincipalRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Initializarion AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-out-quart',
      once: true,
    });
  }, []);

  return (
    <>
      {/* Navigarion */}
      <MainNavbar
        seccionPrincipalRef={seccionPrincipalRef}
        quienesSomosRef={quienesSomosRef}
        serviciosRef={serviciosRef}
        scrollToSection={scrollToSection}
      />

      <main className="relative">
        {/* background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="fixed top-0 left-0 w-full h-full object-cover -z-999"
        >
          <source src="/homepage.mp4" type="video/mp4" />
          Tu navegador no soporta el video.
        </video>

        {/* Main Secction */}
        <HomeSection
          seccionPrincipalRef={seccionPrincipalRef}
          scrollToSection={scrollToSection}
          serviciosRef={serviciosRef}
        />

        {/* Seccion 2 -About */}
        <AboutSection quienesSomosRef={quienesSomosRef} />

        {/* Secction 3 - Services */}
        <ServicesSection serviciosRef={serviciosRef} menus={menus} />
      </main>
    </>
  );
}
