import clsx from 'clsx';

const Price = ({
  amount,
  className,
  style,
  currencyCode = 'USD',
  currencyCodeClassName,
}: {
  amount: string;
  className?: string;
  style?: React.CSSProperties;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className} style={style}>
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol',
    }).format(parseFloat(amount))}`}
    <span
      className={clsx('ml-1 inline', currencyCodeClassName)}
    >{`${currencyCode}`}</span>
  </p>
);

export default Price;
