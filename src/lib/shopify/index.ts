import { domain, endpoint, HIDDEN_PRODUCT_TAG, key, TAGS } from "../constants";
import { isShopifyError } from "../type-guards";
import { addToCartMutation, createCartMutation, editCartItemsMutation, removeFromCartMutation } from "./mutations/cart";
import { getCartQuery } from "./queries/cart";
import { getCollectionProductsQuery, getCollectionsQuery } from "./queries/collection";
import { getMenuQuery } from "./queries/menu";
import { getProductQuery, getProductRecommendationsQuery, getProductsQuery } from "./queries/product";
import { Menu, ShopifyMenuOperation, ExtractVariables, Product, ShopifyCollectionProductsOperation, Connection, ShopifyProduct, Image, ShopifyCart, Cart, ShopifyCreateCartOperation, ShopifyCartOperation, ShopifyRemoveFromCartOperation, ShopifyUpdateCartOperation, ShopifyAddToCartOperation, ShopifyProductOperation, ShopifyProductRecommendationsOperation, ShopifyProductsOperation, ShopifyCollection, Collection, ShopifyCollectionsOperation } from "./types";


export async function shopifyFetch<T>(
    { cache = 'force-cache',
        headers,
        query,
        tags,
        variables }: {
            cache?: RequestCache,
            headers?: HeadersInit,
            query: string,
            tags?: string[],
            variables?: ExtractVariables<T>;
        }): Promise<{ status: number, body: T } | never> {
    try {
        const result = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": key,
                ...headers
            },
            body: JSON.stringify({
                ...(query && { query }),
                ...(variables && { variables })
            }),
            cache,
            ...(tags && { next: { tags } }),
        });
        const body = await result.json()
        if (body.errors) {
            throw body.errors[0];
        }
        return {
            status: result.status,
            body
        }
    } catch (error) {
        if (isShopifyError(error)) {
            throw {
                cause: error.cause?.toString() || "unknown",
                status: error.status || 500,
                message: error.message,
                query,
            };
        }

        throw {
            error,
            query,
        };
    }
}

export async function getMenu(handle: string): Promise<Menu[]> {
    const res = await shopifyFetch<ShopifyMenuOperation>({
        query: getMenuQuery,
        tags: [TAGS.collections],
        variables: {
            handle,
        },
    });

    return (
        res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
            title: item.title,
            path: item.url
                .replace(domain, "")
                .replace("/collections", "/search")
                .replace("/pages", ""),
        })) || []
    );
}
export async function getProducts({
    query,
    reverse,
    sortKey,
}: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
}): Promise<Product[]> {
    const res = await shopifyFetch<ShopifyProductsOperation>({
        query: getProductsQuery,
        tags: [TAGS.products],
        variables: {
            query,
            reverse,
            sortKey,
        },
    });

    return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}
function reshapeCollection(
    collection: ShopifyCollection
): Collection | undefined {
    if (!collection) return undefined;

    return {
        ...collection,
        path: `/search/${collection.handle}`,
    };
}

function reshapeCollections(collections: ShopifyCollection[]) {
    const reshapedCollections = [];

    for (const collection of collections) {
        if (collection) {
            const reshapedCollection = reshapeCollection(collection);

            if (reshapedCollection) {
                reshapedCollections.push(reshapedCollection);
            }
        }
    }

    return reshapedCollections;
}

export async function getCollections(): Promise<Collection[]> {
    const res = await shopifyFetch<ShopifyCollectionsOperation>({
        query: getCollectionsQuery,
        tags: [TAGS.collections],
    });

    const shopifyCollections = removeEdgesAndNodes(res?.body?.data?.collections);
    const collections = [
        {
            handle: "",
            title: "All",
            description: "All products",
            seo: {
                title: "All",
                description: "All products",
            },
            path: "/search",
            updatedAt: new Date().toISOString(),
        },

        ...reshapeCollections(shopifyCollections).filter(
            (collection) => !collection.handle.startsWith("hidden")
        ),
    ];

    return collections;
}
export async function getCollectionProducts({
    collection,
    reverse,
    sortKey,
}: {
    collection: string;
    reverse?: boolean;
    sortKey?: string;
}): Promise<Product[]> {
    const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
        query: getCollectionProductsQuery,
        tags: [TAGS.collections, TAGS.products],
        variables: {
            handle: collection,
            reverse,
            sortKey: sortKey === "CREATED_AT" ? "CREATED" : sortKey,
        },
    });

    if (!res.body.data.collection) {
        console.log(`No collection found for \`${collection}\``);
        return [];
    }

    return reshapeProducts(
        removeEdgesAndNodes(res.body.data.collection.products)
    );
}
function removeEdgesAndNodes<T>(array: Connection<T>): T[] {
    return array.edges.map((edge) => edge?.node);
}

function reshapeImages(images: Connection<Image>, productTitle: string) {
    const flattened = removeEdgesAndNodes(images);

    return flattened.map((image) => {
        const filename = image.url.match(/.*\/(.*)\..*/)?.[1];

        return {
            ...image,
            altText: image.altText || `${productTitle} - ${filename}`,
        };
    });
}
function reshapeProduct(
    product: ShopifyProduct,
    filterHiddenProducts: boolean = true
) {
    if (
        !product ||
        (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
    ) {
        return undefined;
    }

    const { images, variants, ...rest } = product;

    return {
        ...rest,
        images: reshapeImages(images, product.title),
        variants: removeEdgesAndNodes(variants),
    };
}

function reshapeProducts(products: ShopifyProduct[]) {
    const reshapedProducts = [];

    for (const product of products) {
        if (product) {
            const reshapedProduct = reshapeProduct(product);

            if (reshapedProduct) {
                reshapedProducts.push(reshapedProduct);
            }
        }
    }

    return reshapedProducts;
}

export async function getProduct(handle: string): Promise<Product | undefined> {
    const res = await shopifyFetch<ShopifyProductOperation>({
        query: getProductQuery,
        tags: [TAGS.products],
        variables: {
            handle,
        },
    });
    return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(
    productId: string
): Promise<Product[]> {
    const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
        query: getProductRecommendationsQuery,
        tags: [TAGS.products],
        variables: {
            productId,
        },
    });

    return reshapeProducts(res.body.data.productRecommendations);
}

function reshapeCart(cart: ShopifyCart): Cart {
    if (!cart.cost?.totalTaxAmount) {
        cart.cost.totalTaxAmount = {
            amount: "0.0",
            currencyCode: "USD",
        };
    }

    return {
        ...cart,
        lines: removeEdgesAndNodes(cart.lines),
    };
}

export async function createCart(): Promise<Cart> {
    const res = await shopifyFetch<ShopifyCreateCartOperation>({
        query: createCartMutation,
        cache: "no-store",
    });

    return reshapeCart(res.body.data.cartCreate.cart);
}

export async function getCart(
    cartId: string | undefined
): Promise<Cart | undefined> {
    if (!cartId) return undefined;

    const res = await shopifyFetch<ShopifyCartOperation>({
        query: getCartQuery,
        variables: { cartId },
        tags: [TAGS.cart],
    });

    if (!res.body.data.cart) {
        return undefined;
    }

    return reshapeCart(res.body.data.cart);
}

export async function removeFromCart(
    cartId: string,
    lineIds: string[]
): Promise<Cart> {
    const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
        query: removeFromCartMutation,
        variables: {
            cartId,
            lineIds,
        },
        cache: "no-store",
    });

    return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
    cartId: string,
    lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
    const res = await shopifyFetch<ShopifyUpdateCartOperation>({
        query: editCartItemsMutation,
        variables: {
            cartId,
            lines,
        },
        cache: "no-store",
    });

    return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function addToCart(
    cartId: string,
    lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
    const res = await shopifyFetch<ShopifyAddToCartOperation>({
        query: addToCartMutation,
        variables: {
            cartId,
            lines,
        },
        cache: "no-cache",
    });

    return reshapeCart(res.body.data.cartLinesAdd.cart);
}