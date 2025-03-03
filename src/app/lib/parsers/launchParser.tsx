import { GraphQlLaunch } from '@/app/types/graphql/launch';
import { Launch } from '@/app/types/launch';

export const launchParser = (launches: GraphQlLaunch[]): Launch[] => {
  return launches.map(
    (launch) =>
      ({
        id: launch.id,
        missionName: launch.mission_name,
        launchDateUtc: launch.launch_date_utc,
        image: launch.links?.flickr_images?.[0] || undefined,
        details: launch.details,
        rocketFairingsRecoveredStatus: launch?.rocket?.fairings?.recovered,
      } as Launch)
  );
};
