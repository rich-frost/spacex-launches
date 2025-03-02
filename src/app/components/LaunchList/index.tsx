'use client';
import { fetchLaunchesQuery } from '@/app/lib/graphql/queries/fetchLaunchesQuery';
import LaunchCard from '../LaunchCard';
import './index.css';
import { Launch } from '@/app/types/launch';
import fetchLaunches from '@/app/lib/graphql/fetchLaunches';
import { useEffect, useState } from 'react';
import { GRAPHQL_OFFSET } from '@/app/constants/graphql';
import Loading from '../Loading';
import { useGraphQLParams } from '@/app/hooks/useGraphQLParams';

export function LaunchList() {
  const { search, sort, order, searchQueryObject } = useGraphQLParams();
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [launches, setLaunches] = useState<Launch[]>([]);

  const refetchLaunches = async (offset: number) => {
    const query = fetchLaunchesQuery({ find: searchQueryObject, limit: GRAPHQL_OFFSET, offset, sort, order });
    const fetchedLaunches = await fetchLaunches(query);
    return fetchedLaunches;
  };
  // If the offset is updated, re-fetch and add data to existing launches array
  useEffect(() => {
    (async () => {
      const fetchedLaunches = await refetchLaunches(offset);

      if (fetchedLaunches) {
        setLaunches([...launches, ...fetchedLaunches] as Launch[]);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  // If search, sort or order are updated, re-fetch but overwrite the existing array
  useEffect(() => {
    (async () => {
      const fetchedLaunches = await refetchLaunches(0);

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
      {loading && <Loading />}
      {launches.length > 0 && (
        <div className="launch-list-load-more">
          <button onClick={onLoadMore} disabled={loading}>
            Load more
          </button>
        </div>
      )}
    </>
  );
}
