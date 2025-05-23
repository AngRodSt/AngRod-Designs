'use client';

import { ProductOption, ProductVariant } from '@/lib/shopify/types';
import { useProduct, useUpdateURL } from '../../context/ProductContext';
import clsx from 'clsx';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

//Function to select the variant of a product and send it to the url
export default function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {}
    ),
  }));

  return options.map((option) => (
    <form key={option.id}>
      <dl className="mb-8">
        <dt className="mb-4 text-sm uppercase font-bold tracking-wide text-white">
          {option.name}
        </dt>
        <dd className="flex flex-wrap gap-3">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();

            const optionParams = { ...state, [optionNameLowerCase]: value };

            const filtered = Object.entries(optionParams).filter(
              ([key, value]) =>
                options.find(
                  (option) =>
                    option.name.toLowerCase() === key &&
                    option.values.includes(value)
                )
            );

            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) =>
                  combination[key] === value && combination.availableForSale
              )
            );

            const isActive = state[optionNameLowerCase] === value;

            return (
              <button
                formAction={() => {
                  const newState = updateOption(optionNameLowerCase, value);
                  updateURL(newState);
                }}
                key={value}
                aria-disabled={!isAvailableForSale}
                disabled={!isAvailableForSale}
                title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                className={clsx(
                  'flex min-w-[48px] items-center justify-center rounded-full border border-gray-700  px-2 py-1 text-sm ',
                  {
                    'ring-1 cursor-default bg-white ring-red-900': isActive,
                    ' bg-gray-800 text-white transition duration-300 ease-in-out hover:ring-red-900 ':
                      !isActive && isAvailableForSale,
                    'relative z-10 cursor-not-allowed overflow-hidden text-neutral-500 ring-1 ring-white before:absolute ':
                      !isAvailableForSale,
                  }
                )}
              >
                {value}
              </button>
            );
          })}
        </dd>
      </dl>
    </form>
  ));
}
