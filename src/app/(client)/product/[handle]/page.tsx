/* eslint-disable @typescript-eslint/no-explicit-any */
import Gallery from '@/components/product/Gallery';
import { ProductProvider } from '@/context/ProductContext';
import { ProductDescription } from '@/components/product/ProductDescription';
// import { HIDDEN_PRODUCT_TAG } from "@/lib/constants";
import { getProduct, getProductRecommendations } from '@/lib/shopify';
import { Image } from '@/lib/shopify/types';
// import { Metadata } from "next";

import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { NavBar } from '@/components/layout/StoreNavBar';
import ProductCarousel from '@/components/grid/ProductCarousel';

// export async function generateMetadata({
//     params,
// }: {
//     params: { handle: string };
// }): Promise<Metadata> {
//     const product = await getProduct(params.handle);

//     if (!product) return notFound();

//     const { url, width, height, altText: alt } = product.featuredImage || {};
//     const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

//     return {
//         title: product.seo.title || product.title,
//         description: product.seo.description || product.description,
//         robots: {
//             index: indexable,
//             follow: indexable,
//             googleBot: {
//                 index: indexable,
//                 follow: indexable,
//             },
//         },
//         openGraph: url
//             ? {
//                 images: [
//                     {
//                         url,
//                         width,
//                         height,
//                         alt,
//                     },
//                 ],
//             }
//             : null,
//     };
// }

type SegmentParams<T extends object = any> =
  T extends Record<string, any>
    ? {
        [K in keyof T]: T[K] extends string
          ? string | string[] | undefined
          : never;
      }
    : T;
export interface PageProps {
  params?: Promise<SegmentParams<{ handle: string }>>;
  searchParams?: Promise<any>;
}
//Product page, take the data from the params
export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const handle = resolvedParams?.handle;
  if (!handle || Array.isArray(handle)) return notFound();
  const product = await getProduct(handle);
  if (!product) return notFound();
  return (
    <ProductProvider>
      <NavBar />
      <div className="mx-auto max-w-screen-2xl px-4 pt-5">
        <div className="flex flex-col rounded-lg  p-8 md:p-12 lg:flex-row lg:gap-8 ">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={product.images.slice(0, 5).map((image: Image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
            </Suspense>
          </div>
          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>
        <RelatedProducts id={product.id} />
      </div>
    </ProductProvider>
  );
}

//Print the relatedProduct in a carousel
async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold text-white">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        <ProductCarousel products={relatedProducts} />
      </ul>
    </div>
  );
}
