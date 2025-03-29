import MobileHome from "@/components/layout/mobile-home-page";
import { getMenu } from "@/lib/shopify";
import { Menu } from "@/lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const printingMenu = await getMenu('printing-services')
  const designMenu = await getMenu('design-services')
  return (
    <>
      <main className="sm:h-screen flex ">
        <div className="flex md:hidden w-full  pb-5">
          <MobileHome print={printingMenu} desing={designMenu} />
        </div>
        <section className="hidden md:block md:relative overflow-hidden w-1/2 hover:w-3/4 transition-all duration-600 ease-in-out group">
          <h1 className="text-3xl z-10 text-gray-900 absolute bottom-4 ml-20">
            3D Design Service
          </h1>
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10 gap-4 text-2xl opacity-0 hover:opacity-100 transition-all duration-600 ease-in-out ">
            <h1 className="text-3xl">Services</h1>
            {designMenu && designMenu.map((item: Menu) => (
              <Link href={item.path} key={item.title} className="text-xl">{item.title}</Link>)
            )}
          </div>
          <Image
            src={'/figure.jpg'}
            fill
            alt="Home image of a 3D figure"
            className="absolute z-0 w-full h-full object-cover transition-all duration-600 ease-in-out group-hover:blur-sm"
          />
        </section>
        <section className=" hidden  md:block md:relative overflow-hidden w-1/2 hover:w-3/4 transition-all duration-600 ease-in-out group" >
          <h1 className="text-3xl z-10 text-gray-900 absolute bottom-4 ml-20">3D Printing Service</h1>
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10 gap-4 text-2xl opacity-0 hover:opacity-100 transition-all duration-600 ease-in-out ">
            <h1 className="text-3xl ">Services</h1>
            {printingMenu && printingMenu.map((item: Menu) => (
              <Link href={item.path} key={item.title} className="text-xl">{item.title}</Link>)
            )}
          </div>
          <Image
            src={'/printing.jpg'}
            fill
            alt="Home image of a 3D figure"
            className="absolute z-0 w-full h-full object-cover transition-all duration-600 ease-in-out group-hover:blur-sm" />
        </section>
      </main>
    </>
  );
}
