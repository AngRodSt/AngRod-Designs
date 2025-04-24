'use client';

import { Product, ProductVariant } from '@/lib/shopify/types';
import { useProduct } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useActionState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { addItem } from '../../actions/cartActions';
import { styled } from 'styled-components';

// Component to add a product to the cart
export function AddToCart({ product }: { product: Product }) {
  // Destructure the variants and availability of the product
  const { variants, availableForSale } = product;
  // Get the method to add items to the cart
  const { addCartItem } = useCart();
  // Get the selected state of the product options (e.g., size, color)
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);
  // Find the selected variant based on the options chosen by the user
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;
  return (
    <form
      action={async () => {
        // Add the item to the cart and perform the action with the variant
        addCartItem(finalVariant, product);
        await actionWithVariant();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p className="sr-only" role="status" aria-label="polite">
        {message}
      </p>
    </form>
  );
}
// Submit button component that handles the display of different button states
function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  if (!availableForSale) {
    return (
      <StyledWrapper>
        <button
          disabled
          className="button relative mt-5 flex w-full items-center justify-center"
        >
          Out of Stock
        </button>
      </StyledWrapper>
    );
  }
  // If no variant is selected, show a disabled button prompting the user to select an option
  if (!selectedVariantId) {
    return (
      <StyledWrapper>
        <button
          aria-label="Please select an option"
          disabled
          className="button relative mt-5 flex w-full items-center justify-center"
        >
          <div className="absolute left-0 ml-4">
            <PlusIcon className="h-5" />
          </div>
          Add to Cart
        </button>
      </StyledWrapper>
    );
  }
  // If everything is good, show the "Add to Cart" button
  return (
    <StyledWrapper>
      <button
        aria-label="Add to cart"
        className="button mt-10 flex w-full items-center justify-center"
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    padding: 15px 20px;
    border: none;
    outline: none;
    background-color: #f1ccae;
    color: black;
    border-radius: 7px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease-out;
  }

  .button:hover {
    transform: translateY(-3px);
    background-color: #3a0d0d;
    color: #ffff;
  }

  .button:disabled {
    background-color: #d3d3d3;
    color: #a9a9a9;
    cursor: not-allowed;
    transform: none;
  }
`;
