import { useSearchParams } from 'next/navigation';
import { SEARCH_QUERY_PARAM, SORT_QUERY_PARAM } from '@/app/constants/queryParams';
import { SortType } from '@/app/types/pagination';

const isMissionId = (value: string): boolean => {
  return /^[a-f0-9]{24}$/i.test(value);
};

export function useGraphQLParams() {
  const searchParams = useSearchParams();
  const search = searchParams.get(SEARCH_QUERY_PARAM) || '';
  const sortOrder = searchParams.get(SORT_QUERY_PARAM) || 'mission_name:asc';
  const splitSortOrder = sortOrder.split(':');
  const sort = splitSortOrder[0];
  const order = splitSortOrder[1] === 'asc' ? SortType.ASC : SortType.DESC;

  const searchByMissionId = isMissionId(search) ? true : false;

  const searchQueryObject = {
    mission_name: searchByMissionId ? undefined : search,
    mission_id: searchByMissionId ? search : undefined,
  };

  return { search, sort, order, searchQueryObject };
}
