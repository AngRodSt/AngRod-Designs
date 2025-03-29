/* eslint-disable @typescript-eslint/no-explicit-any */
import Grid from "@/components/grid";
import ProductGridItems from "@/components/grid/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getCollectionProducts } from "@/lib/shopify";

type SegmentParams<T extends object = any> = T extends Record<string, any>
    ? { [K in keyof T]: T[K] extends string ? string | string[] | undefined : never }
    : T

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
        : "";

    const sortParam = resolvedSearchParams?.sort;
    const sort = sortParam ? (Array.isArray(sortParam) ? sortParam[0] : sortParam) : undefined;

    const { sortKey, reverse } =
        sorting.find((item) => item.slug === sort) || defaultSort;

    const products = await getCollectionProducts({
        collection,
        sortKey,
        reverse,
    });

    return (
        <>
            <h1 className="text-4xl uppercase mb-16">{collection}</h1>
            <section>
                {products.length === 0 ? (
                    <p className="py-3 text-lg">No products found in this collection</p>
                ) : (
                    <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <ProductGridItems products={products} />
                    </Grid>
                )}
            </section>
        </>
    );
}