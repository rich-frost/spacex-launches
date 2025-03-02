import { DEFAULT_LAUNCH_QUERY_FIELD } from '@/app/constants/graphql';
import { GqlQuery, QueryName } from '@/app/types/graphql';
import { PaginationData, SortType } from '@/app/types/pagination';

export const fetchLaunchesQuery = ({
  find,
  limit,
  offset,
  sort = DEFAULT_LAUNCH_QUERY_FIELD,
  order = SortType.ASC,
}: PaginationData): GqlQuery => {
  const query = `
      query GetLaunches($find: LaunchFind!, $limit: Int, $offset: Int, $sort: String, $order: String) {
        launches(find: $find, limit: $limit, offset: $offset, sort: $sort, order: $order) {
          id
          mission_name
          launch_date_utc
          links {
            flickr_images
          }
          details
          rocket {
            fairings {
              recovered
            }
          }
        }
    }`;

  const variables = {
    find,
    limit,
    offset,
    sort,
    order,
  };

  return { name: QueryName.FetchMissions, query, variables };
};
