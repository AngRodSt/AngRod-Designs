// components/ProductCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import Label from '@/components/product/Label';

interface Product {
  handle: string;
  title: string;
  priceRange: {
    minVariantPrice: { amount: string };
    maxVariantPrice: { currencyCode: string };
  };
  featuredImage?: {
    url: string;
  };
}

//Layout for the product in the carousel
export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="aspect-square max-w-70 max-h-90 p-3 bg-white transition-opacity">
      <Link
        href={`/product/${product.handle}`}
        prefetch={true}
        className="relative inline-block h-full w-full"
      >
        <div
          className={clsx(
            'group flex h-full w-full items-center justify-center overflow-hidden relative'
          )}
        >
          {product.featuredImage?.url ? (
            <Image
              src={product.featuredImage.url}
              alt={product.title}
              fill
              className={clsx(
                'relative h-full py-2 w-full object-contain',
                'hover:scale-105 transition-all duration-600'
              )}
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : null}
        </div>
        <div className="overflow-hidden w-full">
          <Label
            title={product.title}
            amount={product.priceRange.minVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </Link>
    </div>
  );
}
