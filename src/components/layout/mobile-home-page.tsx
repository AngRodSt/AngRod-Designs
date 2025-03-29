import { Menu } from "@/lib/shopify/types"
import Image from "next/image"
import Link from "next/link"

function MobileHome(props: { print: Menu[], desing: Menu[] }) {
    const { print, desing } = props
    return (
        <>
            <main className="mt-32 flex flex-col gap-5 mx-10 w-full justify-center">
                <section className="flex flex-col justify-center items-center mb-10">
                    <h1 className="text-3xl text-center mb-4 text-[#9c200d] uppercase">Designs</h1>
                    <div className="flex gap-3 sm:flex-row justify-center items-center flex-col">
                        <Image
                            src={'/figure.jpg'}
                            width={300}
                            height={100}
                            alt="Home image of a 3D figure"
                            className="rounded-sm shadow-2xl"
                        />
                        <div className="flex  flex-col justify-center items-center gap-5 text-center">
                            <h2 className="text-2xl">Services</h2>
                            {desing && desing.map((item: Menu) => (
                                <Link href={item.path} key={item.title} className="text-xl">{item.title}</Link>)
                            )}
                        </div>
                    </div>
                </section>
                <section className="flex flex-col justify-center items-center mb-4">
                    <h1 className="text-3xl text-center mb-4 text-[#9c200d] uppercase">Printing</h1>
                    <div className="flex gap-3 sm:flex-row justify-center items-center flex-col">
                        <Image
                            src={'/printing.jpg'}
                            width={300}
                            height={100}
                            alt="Home image of a 3D figure"
                            className="rounded-sm shadow-2xl" />
                        <div className="flex  flex-col justify-center items-center gap-5 text-center">
                            <h2 className="text-2xl">Services</h2>
                            {print && print.map((item: Menu) => (
                                <Link href={item.path} key={item.title} className="text-xl">{item.title}</Link>)
                            )}
                        </div>
                    </div>
                </section>
            </main>

        </>
    )
}

export default MobileHome