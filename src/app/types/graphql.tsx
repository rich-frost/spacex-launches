export type GqlQuery = {
  query: string;
  name: QueryName;
  variables: object;
};

export enum QueryName {
  FetchMissions = 'fetchMissions',
}
