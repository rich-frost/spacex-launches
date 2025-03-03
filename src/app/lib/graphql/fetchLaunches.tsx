import { SPACEX_GRAPHQL_BASE_URL } from '@/app/constants/graphql';
import { GqlQuery } from '@/app/types/graphql';
import { launchParser } from '../parsers/launchParser';

const fetchLaunches = async (query: GqlQuery) => {
  const params = new URLSearchParams({
    query: query.query,
    variables: JSON.stringify(query.variables),
  }).toString();

  const queryUrl = `${SPACEX_GRAPHQL_BASE_URL}?${params}`;

  try {
    const queryResult = await fetch(queryUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await queryResult.json();

    // TODO: Add type guard check

    // Parse data to standard format
    const launchData = launchParser(response?.data?.launches);

    return launchData;
  } catch (e) {
    // TODO: Add log to indicate error fetching data
    console.warn(e);
    return undefined;
  }
};

export default fetchLaunches;
