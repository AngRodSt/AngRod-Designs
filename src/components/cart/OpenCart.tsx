import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-gray-700 bg-white hover:bg-[#3a0d0d] hover:text-white  text-black transition-colors ">
      <ShoppingCartIcon
        className={clsx(
          'h-5 transition-all ease-in-out font-extrabold hover:scale-110',
          className
        )}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-[#f1cca3] text-[11px] font-medium text-black ">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
