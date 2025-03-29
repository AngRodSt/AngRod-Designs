"use client";

import { Menu } from "@/lib/shopify/types";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment, useState } from "react";
import Image from "next/image";
import Search from "./search";
import CartModal from "@/components/cart/modal";

export default function MobileMenu({ menu }: { menu: Menu[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const openMobileMenu = () => setIsOpen(true);
    const closeMobileMenu = () => setIsOpen(false);
    return (
        <>
            <button
                onClick={openMobileMenu}
                aria-label="Open mobile menu"
                className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-400 text-black transition-colors md:hidden "
            >
                <Bars3Icon className="h-7" />
            </button>

            <Transition show={isOpen}>
                <Dialog onClose={closeMobileMenu} className="relative z-50">
                    <Transition.Child
                        as={Fragment}
                        enter="transition-all ease-in-out duration-300"
                        enterFrom="opacity-0 backdrop-blur-none"
                        enterTo="opacity-100 backdrop-blur-[.5px]"
                        leave="transition-all ease-in-out duration-200"
                        leaveFrom="opacity-100 backdrop-blur-[.5px]"
                        leaveTo="opacity-0 backdrop-blur-none"
                    >
                        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-all ease-in-out duration-300"
                        enterFrom="translate-x-[-100%]"
                        enterTo="translate-x-0"
                        leave="transition-all ease-in-out duration-200"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-[-100%]"
                    >
                        <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col border-neutral-700 p-6 text-white backdrop-blur-xl  bg-black/80 ">
                            <div className="p-4">
                                <button
                                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-400 text-white "
                                    onClick={closeMobileMenu}
                                    aria-label="Close mobile menu"
                                >
                                    <XMarkIcon className="h-6" />
                                </button>
                                <div className="flex justify-center">
                                    <Link href={menu[0].path}  onClick={closeMobileMenu}>
                                        <Image width={150} height={100} src={'/logo-trans.png'} alt="image of the logo" />
                                    </Link>
                                </div>
                                <div className="mb-4 w-full">
                                    <Search />
                                </div>
                                {menu.length > 0 ? (
                                    <ul className="flex w-full flex-col">
                                        {menu.map((item: Menu) => (
                                            <li
                                                className="py-2 text-xl text-white transition-colors "
                                                key={item.title}
                                            >
                                                <Link
                                                    href={item.path}
                                                    prefetch={true}
                                                    onClick={closeMobileMenu}
                                                >
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                                <div className="flex gap-2 items-center py-2 text-xl text-white ">
                                    <p>Cart</p>
                                    <CartModal />
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    );
}