export enum SortType {
  ASC = 'asc',
  DESC = 'desc',
}

export type PaginationData = {
  limit: number;
  offset: number;
  find: {
    mission_id?: string;
    mission_name?: string;
  };
  sort?: string;
  order?: SortType;
};
