import Grid from "@/components/grid";
import ProductGridItems from "@/components/grid/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getProducts } from "@/lib/shopify";

export const metadata = {
    title: "Search",
    description: "Search for products in the store.",
};

export default async function SearchPage({
    searchParams,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedSearchParams = await searchParams;
    const { sort, q: searchValue } = resolvedSearchParams as { [key: string]: string | string[] | undefined };

    const sortParam = Array.isArray(sort) ? sort[0] : sort;
    const { sortKey, reverse } = sorting.find((item) => item.slug === sortParam) || defaultSort;

    const products = await getProducts({ sortKey, reverse, query: Array.isArray(searchValue) ? searchValue[0] : searchValue });
    const resultsText = products.length > 1 ? "results" : "result";

    return (
        <>
            {searchValue ? (
                <p className="mb-4">
                    {products.length === 0
                        ? "There are no products that match"
                        : `Showing ${products.length} ${resultsText} for `}
                    <span>&quot;{searchValue}&quot;</span>
                </p>
            ) : null}
            {products.length > 0 ? (
                <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <ProductGridItems products={products} />
                </Grid>
            ) : null}
        </>
    );
}