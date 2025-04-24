'use client';

import { getOrders } from '@/actions/adminActions';
import DynamicOrderTable from '@/components/admin/DynamicOrderTable';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export default function DashboardPage() {
  const [orders, setOrders] = useState<RequestDesignType[]>([]);

  //UseEffect to fecth the existing orders
  useEffect(() => {
    const getData = async () => {
      const result = await getOrders();
      if (result.error) {
        throw new Error(result.response);
      } else {
        setOrders(result.response);
      }
    };
    getData();
  }, []);

  //Function for refresh de orders when some of them has been updated
  const refreshOrders = useMemo(() => {
    return async () => {
      const result = await getOrders();
      if (result.error) {
        throw new Error(result.response);
      } else {
        setOrders(result.response);
      }
    };
  }, []);

  return (
    <>
      <nav className="bg-gray-800 text-white">
        <div className="flex  justify-between w-full  items-center container mx-auto">
          <section className="flex  w-full">
            <Link href={'/'}>
              <Image
                width={70}
                height={70}
                src={'/logo-tra.png'}
                alt="image of the logo"
              />
            </Link>
          </section>

          <section className="flex gap-2 w-full items-center justify-end">
            <h1 className="text-xl">AngRod Design</h1>
          </section>
        </div>
      </nav>
      <div className="h-screen mt-5 text-gray-100 container mx-auto">
        <section className="p-4">
          <h1 className="text-2xl text-gray-400">
            Welcome in, <span>Sthefany</span>
          </h1>
          <h3 className=" text-gray-400">Let&apos;s see what is new ...</h3>
        </section>
        <DynamicOrderTable orders={orders} refreshOrders={refreshOrders} />
      </div>
    </>
  );
}

type RequestDesignType = {
  type: string;
  name: string;
  email: string;
  phone?: string | null;
  desingDescription?: string;
  material?: string;
  functionality: boolean;
  functionalityDescription?: string | null;
  functionalityType?: string;
  date: string | Date;
  dimension?: string;
  file?: string | null;
  status: string;
  cost: string | null;
};
