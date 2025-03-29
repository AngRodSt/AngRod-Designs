import Grid from "@/components/grid";
import ProductGridItems from "@/components/grid/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getCollectionProducts } from "@/lib/shopify";

export default async function CategoryPage({
    params,
    searchParams,
}: {
    params: { collection?: string };  
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const collection = params?.collection ?? ""; 
    const sort = searchParams?.sort ? String(searchParams.sort) : undefined; 

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