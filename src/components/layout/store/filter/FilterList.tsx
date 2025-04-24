'use client';
import { SortFilterItem } from '@/lib/constants';
import { FilterItem } from './FilterItem';
import FilterItemDropDown from './FilterItemDropDown';
import React from 'react';
import FixedSection from '@/components/ui/FixedSection';

//Properties for the collection element
export type PathFilterItem = { title: string; path: string };
export type ListItem = SortFilterItem | PathFilterItem;

function FilterItemList({ list, type }: { list: ListItem[]; type?: string }) {
  return (
    <>
      {type && (
        <FixedSection
          threshold={117}
          classNameFixed="bg-gray-900 justify-center top-0"
          classNameRelative="bg-gray-900 justify-center"
        >
          {list.map((item: ListItem, i) => (
            <FilterItem key={i} item={item} />
          ))}
        </FixedSection>
      )}
    </>
  );
}

export default function FilterList({
  list,
  type,
}: {
  list: ListItem[];
  type?: string;
}) {
  return (
    <>
      <nav className="">
        {type ? (
          <ul>
            <FilterItemList list={list} type={type} />
          </ul>
        ) : (
          <ul>
            <FilterItemDropDown list={list} />
          </ul>
        )}
      </nav>
    </>
  );
}
