import Grid from '@/components/grid/Grid';
import ProductGridItems from '@/components/grid/ProductGridItems';
import { defaultSort, sorting } from '@/lib/constants';
import { getProducts } from '@/lib/shopify';
import ProductCarousel from '@/components/grid/ProductCarousel';
import { Product } from '@/lib/shopify/types';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.',
};

//Main page of the store
export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const { sort, q: searchValue } = resolvedSearchParams as {
    [key: string]: string | string[] | undefined;
  };

  const sortParam = Array.isArray(sort) ? sort[0] : sort;
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sortParam) || defaultSort;

  //Fetching the products
  let products: Product[] = [];
  try {
    products = await getProducts({
      sortKey,
      reverse,
      query: Array.isArray(searchValue) ? searchValue[0] : searchValue,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
  const resultsText = products.length > 1 ? 'results' : 'result';

  return (
    <>
      <main className="flex flex-col">
        <div className=" relative flex h-[30rem] mb-10 z-20">
          <div className="absolute left-0 w-full h-[30rem] bg-black opacity-50 z-10" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className=" top-0 left-0 w-full h-full object-cover "
          >
            <source src="/video2.mp4" type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
          <div className="z-20 absolute bottom-5 mx-5">
            <h1
              className="text-4xl text-white md:text-[5rem]  mb-4 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]"
              style={{
                letterSpacing: '-0.1rem',
              }}
            >
              AngRod{' '}
              <span className="text-5xl md:text-[6rem] text-[#f1cca3] ">
                Store
              </span>
            </h1>
            <p className="text-xl text-gray-100 font-extralight mb-6 drop-shadow-[1px_1px_3px_rgba(0,0,0,0.7)]">
              Where precision meets creativity
            </p>
          </div>
        </div>
        {!searchValue && (
          <div className="text-white text-center mb-10 flex mx-5 xl:mx-96 md:mx-45  flex-col">
            <h3>Just Here</h3>
            <h1 className="text-5xl ">Our Best Sellers</h1>
            <h3 className="font-extralight text-[#f1cca3]">
              Discover the designs everyone’s loving! From standout prints to
              customer favorites, these top picks bring style, creativity, and
              quality together. Shop the trends that keep flying off the
              shelves!
            </h3>
          </div>
        )}
        <div className="container mx-auto flex justify-center">
          {!searchValue && products.length > 0 ? (
            <ProductCarousel products={products} />
          ) : null}
          {searchValue ? (
            <div>
              <p className="mb-4 text-white">
                {products.length === 0
                  ? 'There are no products that match '
                  : `Showing ${products.length} ${resultsText} for `}
                <span>&quot;{searchValue}&quot;</span>
              </p>
              <Grid className="grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                <ProductGridItems products={products} />
              </Grid>
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
}
