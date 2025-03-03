export type GraphQlLaunch = {
  id: string;
  mission_name: string;
  launch_date_utc: string;
  links: {
    flickr_images: string[];
  };
  details: string;
  rocket?: { fairings?: { recovered?: boolean } };
};
