import Footer from '@/components/layout/Footer';
import HomeLayout from '@/components/screens/HomeLayout';
import { getMenu } from '@/lib/shopify';

export default async function Home() {
  //Fetching the service menu from shopify
  const Menus = await getMenu('service-menu');
  return (
    <>
      <HomeLayout menus={Menus} />
      <Footer />
    </>
  );
}
