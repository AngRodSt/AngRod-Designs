'use client'

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product, ProductVariant } from "@/lib/shopify/types";
import Price from "./price";
import VariantSelector from "./variant-selector";
import Prose from "./prose";
import { AddToCart } from "../cart/add-to-cart";

export function ProductDescription({ product }: { product: Product }) {
    const searchParams = useSearchParams();
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>()

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
      
        // Obtener opciones seleccionadas desde la URL
        const selectedOptions = product.options.map((option) => ({
            name: option.name,
            value: params.get(option.name.toLowerCase()) || "", // Si no está en la URL, dejar vacío
        }));

        // Buscar el variante que coincide con las opciones seleccionadas
        const matchingVariant = product.variants.find((variant) =>
            variant.selectedOptions.every(
                (opt) =>
                    selectedOptions.find((o) => o.name === opt.name)?.value === opt.value
            )
        );

        // Si encontramos un variante, actualizar el estado
        if (matchingVariant) {
            setSelectedVariant(matchingVariant);
        }
    }, [searchParams, product.variants, product.options]);

    return (
        <>
            <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                <h1 className="my-2 text-5xl font-medium">{product.title}</h1>
                <div className="mr-auto w-auto rounded-full  p-2 text-sm text-gray-950  font-bold" style={{
                    backgroundColor: 'rgba(19, 180, 251, 0.7)',
                }}>
                    <Price
                        amount={selectedVariant ? selectedVariant.price.amount : product.priceRange.minVariantPrice.amount}
                        currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                    />
                </div>
            </div>
            <VariantSelector options={product.options} variants={product.variants} />
            {product.descriptionHtml ? (
                <Prose
                    className="mb-6 text-sm "
                    html={product.descriptionHtml}
                />
            ) : null}
            <AddToCart product={product} />
        </>
    );
}