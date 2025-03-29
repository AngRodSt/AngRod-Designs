/* eslint-disable @next/next/no-img-element */
import { getMenu } from "@/lib/shopify"
import { Menu } from "@/lib/shopify/types"
// import Image from "next/image"
import Link from "next/link"
import CartModal from "@/components/cart/modal";
import MobileMenu from "./mobile-menu";
import Search from "./search";

export async function NavBar() {
    const menu = await getMenu("frontend-menu");
    return (
        <nav className=" absolute flex w-full items-center justify-between  p-4 lg:px-6  top-0 z-20">
            <div className="md:flex justify-between md:w-1/3  ">
                <Link href={menu[0].path}>
                <img src="/logo-trans.png" alt="image of the logo" className="w-30 " />
                    {/* <Image width={100} height={100} src={'/logo-trans.png'} alt="image of the logo" /> */}
                </Link>
                {menu.length > 0 ? (
                    <ul className="hidden gap-6 md:flex md:items-center">
                        {menu.map((item: Menu) => (
                            <li key={item.title}>
                                <Link
                                    href={item.path}
                                    prefetch={true}
                                    className="text-gray-800 underline-offset-4 hover:text-black hover:underline "
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
            <div className="hidden  md:flex md:w-1/4">
                <Search />
            </div>
            <div className="md:flex  md:w-1/3 hidden justify-end">
                <CartModal />
            </div>
            <div className="block flex-none md:hidden">
                <MobileMenu menu={menu} />
            </div>
        </nav>
    );
}

