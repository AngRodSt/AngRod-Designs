import clsx from 'clsx';
import Price from './Price';

export default function Label({
  title,
  amount,
  currencyCode,
  position = 'bottom',
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) {
  return (
    <div
      className={clsx(' flex flex-col w-full pb-4 srccontainer/label', {
        'lg:px-20 lg:pb-[35%]': position === 'center',
      })}
    >
      <div className="flex flex-col text-xs  font-semibold">
        <p className=" pl-2">New</p>
        <h3 className="mr-4 h-10 line-clamp-2  flex-grow pl-2 leading-none tracking-tight text-xl">
          {title}
        </h3>
        <Price
          className="flex-none rounded-full pl-2 mt-1 text-black text-sm"
          style={{}}
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden src[275px]/label:inline"
        />
      </div>
    </div>
  );
}
