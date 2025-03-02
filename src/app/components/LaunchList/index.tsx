'use client';
import { fetchLaunchesQuery } from '@/app/lib/graphql/queries/fetchLaunchesQuery';
import LaunchCard from '../LaunchCard';
import './index.css';
import { Launch } from '@/app/types/launch';
import fetchLaunches from '@/app/lib/graphql/fetchLaunches';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SEARCH_QUERY_PARAM, SORT_QUERY_PARAM } from '@/app/constants/queryParams';
import { GRAPHQL_OFFSET } from '@/app/constants/graphql';
import { SortType } from '@/app/types/pagination';

const isNumber = (value: string): boolean => {
  return !isNaN(Number(value)) && typeof value !== 'boolean';
};

export function LaunchList() {
  const searchParams = useSearchParams();
  const search = searchParams.get(SEARCH_QUERY_PARAM) || '';
  const sortOrder = searchParams.get(SORT_QUERY_PARAM) || 'mission_name:asc';
  const splitSortOrder = sortOrder.split(':');
  const sort = splitSortOrder[0];
  const order = splitSortOrder[1] === 'asc' ? SortType.ASC : SortType.DESC;

  const searchByMissionId = isNumber(search) ? true : false;

  const searchQueryObject = {
    mission_name: searchByMissionId ? undefined : search,
    mission_id: searchByMissionId ? search : undefined,
  };

  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [launches, setLaunches] = useState<Launch[]>([]);

  useEffect(() => {
    (async () => {
      const query = fetchLaunchesQuery({ find: searchQueryObject, limit: GRAPHQL_OFFSET, offset, sort, order });
      const fetchedLaunches = await fetchLaunches(query);

      if (fetchedLaunches) {
        setLaunches([...launches, ...fetchedLaunches] as Launch[]);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  useEffect(() => {
    (async () => {
      const query = fetchLaunchesQuery({
        find: searchQueryObject,
        limit: GRAPHQL_OFFSET,
        offset: 0,
        sort,
        order,
      });
      const fetchedLaunches = await fetchLaunches(query);

      if (fetchedLaunches) {
        setLaunches(fetchedLaunches);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sort, order]);

  const onLoadMore = () => {
    setOffset(offset + GRAPHQL_OFFSET);
    setLoading(true);
  };

  return (
    <>
      <ul className="launch-list">
        {launches.map((launch: Launch) => (
          <LaunchCard
            key={`${launch.id}`}
            id={launch.id}
            missionName={launch.missionName}
            details={launch.details}
            launchDateUtc={launch.launchDateUtc}
            image={launch.image}
            rocketFairingsRecoveredStatus={launch.rocketFairingsRecoveredStatus}
          />
        ))}
      </ul>
      {launches.length > 0 && (
        <button onClick={onLoadMore} disabled={loading}>
          Load more
        </button>
      )}
    </>
  );
}
