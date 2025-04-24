/* eslint-disable @typescript-eslint/no-explicit-any */
import Grid from '@/components/grid/Grid';
import ProductGridItems from '@/components/grid/ProductGridItems';
import FilterList from '@/components/layout/store/filter/FilterList';
import { defaultSort, sorting } from '@/lib/constants';
import { getCollectionProducts } from '@/lib/shopify';
import FixedSection from '@/components/ui/FixedSection';

type SegmentParams<T extends object = any> =
  T extends Record<string, any>
    ? {
        [K in keyof T]: T[K] extends string
          ? string | string[] | undefined
          : never;
      }
    : T;

//Fetching the product by the collection
export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<SegmentParams<{ collection: string }>>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const collection = resolvedParams?.collection
    ? Array.isArray(resolvedParams.collection)
      ? resolvedParams.collection[0]
      : resolvedParams.collection
    : '';

  const sortParam = resolvedSearchParams?.sort;
  const sort = sortParam
    ? Array.isArray(sortParam)
      ? sortParam[0]
      : sortParam
    : undefined;

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getCollectionProducts({
    collection,
    sortKey,
    reverse,
  });

  return (
    <section className="flex flex-col w-full gap-3">
      <FixedSection
        classNameFixed="bg-[#f1cca3] top-10 mb-50"
        threshold={117}
        classNameRelative="absolute bg-[#f1cca3] "
      >
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl text-black uppercase">{collection}</h1>
          <FilterList list={sorting} />
        </div>
      </FixedSection>

      <section className="mt-30 mx-5">
        <div className="container mx-auto flex justify-center">
          {products.length === 0 ? (
            <p className="py-3 text-lg">No products found in this collection</p>
          ) : (
            <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 ">
              <ProductGridItems products={products} />
            </Grid>
          )}
        </div>
      </section>
    </section>
  );
}
