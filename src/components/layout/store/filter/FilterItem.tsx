'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { ListItem, type PathFilterItem } from './FilterList';
import Link from 'next/link';
import { createUrl } from '@/lib/utils';
import type { SortFilterItem } from '@/lib/constants';
import clsx from 'clsx';

//Functions to add the filters properties to the products
function PathFilterItem({ item }: { item: PathFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname === item.path;
  const newParams = new URLSearchParams(searchParams?.toString());
  const DynamicTag = active ? 'p' : Link;
  newParams.delete('q');

  return (
    <div className="flex flex-row">
      <li className="text-white " key={item.title}>
        <DynamicTag
          href={createUrl(item.path, newParams)}
          className={clsx('w-full hover:underline hover:underline-offset-4', {
            'underline underline-offset-4 text-[#f1cca3]': active,
          })}
        >
          {item.title}
        </DynamicTag>
      </li>
    </div>
  );
}
//Sort filter List
function SortFilterItem({ item }: { item: SortFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams?.get('sort') === item.slug;
  const q = searchParams?.get('q');

  const href = createUrl(
    pathname || '',
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug }),
    })
  );
  const DynamicTag = active ? 'p' : Link;

  return (
    <h3 className="mt-2 flex text-sm text-gray-950 " key={item.title}>
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={clsx('w-full hover:underline hover:underline-offset-4', {
          'underline underline-offset-4 text-[#3a0d0d]': active,
        })}
      >
        {item.title}
      </DynamicTag>
    </h3>
  );
}

export function FilterItem({ item }: { item: ListItem }) {
  return 'path' in item ? (
    <PathFilterItem item={item} />
  ) : (
    <SortFilterItem item={item} />
  );
}
