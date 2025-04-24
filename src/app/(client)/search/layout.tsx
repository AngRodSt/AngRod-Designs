import { NavBar } from '@/components/layout/StoreNavBar';
import Collections from '@/components/layout/store/CollectionList';

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <NavBar />
      <Collections />
      <div className=" flex w-full gap-8  pb-4 flex-col mb-10 md:flex-row ">
        <div className="order-last min-h-screen w-full md:order-none">
          {children}
        </div>
      </div>
    </main>
  );
}
