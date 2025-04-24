'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product, ProductVariant } from '@/lib/shopify/types';
import Price from './Price';
import VariantSelector from './VariantSelector';
import Prose from './Prose';
import { AddToCart } from '../cart/AddToCart';

export function ProductDescription({ product }: { product: Product }) {
  const searchParams = useSearchParams();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());

    // Get selected options from the URL
    const selectedOptions = product.options.map((option) => ({
      name: option.name,
      value: params.get(option.name.toLowerCase()) || '', // If not in the URL, leave empty
    }));

    // Find the variant that matches the selected options
    const matchingVariant = product.variants.find((variant) =>
      variant.selectedOptions.every(
        (opt) =>
          selectedOptions.find((o) => o.name === opt.name)?.value === opt.value
      )
    );

    // If we find a matching variant, update the state
    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
    }
  }, [searchParams, product.variants, product.options]);

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 border-neutral-700">
        <h1 className="my-2 text-5xl font-medium text-[#f1cca3]">
          {product.title}
        </h1>

        <div className="mr-auto w-auto text-xl text-white  font-bold">
          <Price
            amount={
              selectedVariant
                ? selectedVariant.price.amount
                : product.priceRange.minVariantPrice.amount
            }
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <Prose className="mb-6 text-sm " html={product.descriptionHtml} />
      ) : null}
      <AddToCart product={product} />
    </>
  );
}
