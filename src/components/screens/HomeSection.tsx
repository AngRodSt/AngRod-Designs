import { useTypewriter } from 'react-simple-typewriter';

interface HomePageProps {
  seccionPrincipalRef: React.RefObject<HTMLDivElement | null>;
  scrollToSection: (ref: React.RefObject<HTMLElement | null>) => void;
  serviciosRef: React.RefObject<HTMLDivElement | null>;
}
export default function HomePage({
  seccionPrincipalRef,
  scrollToSection,
  serviciosRef,
}: HomePageProps) {
  const [AngRod] = useTypewriter({
    words: ['AngRod'],
    loop: 1,
    typeSpeed: 100,
    deleteSpeed: 400,
    delaySpeed: 1000,
  });
  const [Design] = useTypewriter({
    words: ['Designs'],
    loop: 1,
    typeSpeed: 100,
    deleteSpeed: 400,
    delaySpeed: 2000,
  });

  return (
    <>
      <section
        ref={seccionPrincipalRef}
        className="relative h-screen  text-gray-200 flex flex-col justify-center items-center text-center px-4 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 z-10" />
        {/* Main Content */}
        <div className="z-20">
          <h1
            className="text-4xl text-white md:text-[8rem]  mb-4 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]"
            data-aos="fade-up"
            style={{
              letterSpacing: '-0.3rem',
            }}
          >
            {AngRod}{' '}
            <span className="text-5xl md:text-[8rem] text-[#f1cca3] ">
              {Design}
            </span>
          </h1>
          <p
            className="text-xl text-gray-100 font-extralight mb-6 drop-shadow-[1px_1px_3px_rgba(0,0,0,0.7)]"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Where precision meets creativity
          </p>
          <button
            onClick={() => scrollToSection(serviciosRef)}
            className="bg-[#f1cca3] text-black font-semibold px-6 py-3 rounded shadow hover:bg-[#3a0d0d] hover:text-white hover:scale-105 transition-transform ease-in-out duration-300"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Go to Services
          </button>
        </div>
      </section>
    </>
  );
}
