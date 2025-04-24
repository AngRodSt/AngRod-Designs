import { RefObject } from 'react';
import Image from 'next/image';

interface AboutSectionProps {
  quienesSomosRef: RefObject<HTMLDivElement | null>;
}

export default function AboutSection({ quienesSomosRef }: AboutSectionProps) {
  return (
    <section
      className="min-h-screen py-45 px-6 bg-gray-900 text-white"
      id="quienes-somos"
      ref={quienesSomosRef}
    >
      <h2 className="text-5xl font-bold text-center mb-10" data-aos="fade-up">
        Who Are We?
      </h2>
      <p
        className="max-w-3xl mx-auto text-center text-lg mb-16"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Angrod Designs is a small company founded by two brothers passionate
        about design and 3D printing. We develop innovative projects that solve
        real-world problems, combining creativity and technology to transform
        ideas into reality.{' '}
      </p>
      <div className="flex flex-col gap-10 md:flex-row md:justify-center container mx-auto">
        {/* Innovation Card */}
        <div
          className="relative w-full md:w-1/4 h-64 rounded-lg overflow-hidden shadow-2xl transition-all duration-300"
          data-aos="fade-right"
        >
          <Image
            src="/innovacion.webp"
            alt="Innovación"
            fill
            style={{ objectFit: 'cover' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/innovacion.jpg';
            }}
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
            <h3
              className="text-2xl font-bold mb-2 text-[#f8d6b0]"
              style={{ textShadow: '1px 1px 10px rgba(225, 225, 225, 0.8)' }}
            >
              Innovation
            </h3>
            <p className="text-center">
              We incorporate new ideas and technologies to offer creative and
              effective solutions to our clients.
            </p>
          </div>
        </div>
        {/* Profesionalism Card */}
        <div
          className="relative w-full md:w-1/4 h-64 rounded-lg overflow-hidden shadow-2xl transition-all duration-300"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <Image
            src="/profesionalismo.jpg"
            alt="Profesionalismo"
            fill
            style={{ objectFit: 'cover' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/profesionalismo.jpg';
            }}
          />
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
            <h3
              className="text-2xl font-bold mb-2 text-[#f8d6b0]"
              style={{ textShadow: '1px 1px 10px rgba(225, 225, 225, 0.8)' }}
            >
              Professionalism
            </h3>
            <p className="text-center">
              Our commitment is to provide high-quality service, with
              seriousness and responsibility in each project.
            </p>
          </div>
        </div>
        {/* Commitment Card */}
        <div
          className="relative w-full md:w-1/4 h-64 rounded-lg overflow-hidden shadow-2xl transition-all duration-300"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <Image
            src="/creatividad.webp"
            alt="Compromiso"
            fill
            style={{ objectFit: 'cover' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/creatividad.jpg';
            }}
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
            <h3
              className="text-2xl font-bold mb-2 text-[#f8d6b0]"
              style={{ textShadow: '1px 1px 10px rgba(225, 225, 225, 0.8)' }}
            >
              Commitment
            </h3>
            <p className="text-center">
              We work with passion and dedication to exceed expectations and
              generate solutions that make a difference.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
