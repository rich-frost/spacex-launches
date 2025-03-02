'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useDebouncedCallback } from 'use-debounce';
import './index.css';
import { SEARCH_QUERY_PARAM, SORT_QUERY_PARAM } from '@/app/constants/queryParams';

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(SEARCH_QUERY_PARAM, term);
    } else {
      params.delete(SEARCH_QUERY_PARAM);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSort = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(SORT_QUERY_PARAM, term);
    } else {
      params.delete(SORT_QUERY_PARAM);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search mission name or mission ID..."
        defaultValue={searchParams.get(SEARCH_QUERY_PARAM)?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <select
        name="sort-order"
        id="sort-order"
        onChange={(e) => {
          handleSort(e.target.value);
        }}
        value={searchParams.get(SORT_QUERY_PARAM)?.toString()}
      >
        <option value="mission_name:asc">Mission Name (ASC)</option>
        <option value="mission_name:desc">Mission Name (DESC)</option>
      </select>
    </div>
  );
};

export default Search;
