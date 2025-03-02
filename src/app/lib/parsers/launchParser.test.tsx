import { launchParser } from '@/app/lib/parsers/launchParser';
import { GraphQlLaunch } from '@/app/types/graphql/launch';
import { Launch } from '@/app/types/launch';
import { describe, it, expect } from 'vitest';

describe('launchParser', () => {
  it('should correctly map a GraphQlLaunch to a Launch object', () => {
    const graphQlLaunches: GraphQlLaunch[] = [
      {
        id: '1',
        mission_name: 'Mission 1',
        launch_date_utc: '2025-03-01T00:00:00Z',
        links: {
          flickr_images: ['https://example.com/image1.jpg'],
        },
        details: 'Some details about the mission',
        rocket: {
          fairings: {
            recovered: true,
          },
        },
      },
    ];

    const result: Launch[] = launchParser(graphQlLaunches);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: '1',
      missionName: 'Mission 1',
      launchDateUtc: '2025-03-01T00:00:00Z',
      image: 'https://example.com/image1.jpg',
      details: 'Some details about the mission',
      rocketFairingsRecoveredStatus: true,
    });
  });

  it('should return "undefined" if rocket fairings status is not provided', () => {
    const graphQlLaunches: GraphQlLaunch[] = [
      {
        id: '2',
        mission_name: 'Mission 2',
        launch_date_utc: '2025-03-02T00:00:00Z',
        links: {
          flickr_images: ['https://example.com/image2.jpg'],
        },
        details: 'Details for mission 2',
        rocket: {},
      },
    ];

    const result: Launch[] = launchParser(graphQlLaunches);

    expect(result[0].rocketFairingsRecoveredStatus).toBe(undefined);
  });

  it('should correctly handle cases where the flickr_images array is empty or undefined', () => {
    const graphQlLaunches: GraphQlLaunch[] = [
      {
        id: '3',
        mission_name: 'Mission 3',
        launch_date_utc: '2025-03-03T00:00:00Z',
        links: {
          flickr_images: [],
        },
        details: 'Details for mission 3',
        rocket: {
          fairings: {
            recovered: false,
          },
        },
      },
      {
        id: '4',
        mission_name: 'Mission 4',
        launch_date_utc: '2025-03-04T00:00:00Z',
        links: {},
        details: 'Details for mission 4',
        rocket: {
          fairings: {
            recovered: true,
          },
        },
      },
    ];

    const result: Launch[] = launchParser(graphQlLaunches);

    expect(result[0].image).toBeUndefined();
    expect(result[1].image).toBeUndefined();
  });

  it('should handle empty input array', () => {
    const result: Launch[] = launchParser([]);

    expect(result).toEqual([]);
  });

  it('should handle missing fields gracefully', () => {
    const graphQlLaunches: GraphQlLaunch[] = [
      {
        id: '5',
        mission_name: 'Mission 5',
        launch_date_utc: '2025-03-05T00:00:00Z',
        links: undefined,
        details: 'Mission 5 details',
        rocket: {},
      },
    ];

    const result: Launch[] = launchParser(graphQlLaunches);

    expect(result[0].image).toBeUndefined();
    expect(result[0].rocketFairingsRecoveredStatus).toBe(undefined);
  });

  it('should map multiple launches correctly', () => {
    const graphQlLaunches: GraphQlLaunch[] = [
      {
        id: '6',
        mission_name: 'Mission 6',
        launch_date_utc: '2025-03-06T00:00:00Z',
        links: {
          flickr_images: ['https://example.com/image6.jpg'],
        },
        details: 'Details for mission 6',
        rocket: {
          fairings: {
            recovered: true,
          },
        },
      },
      {
        id: '7',
        mission_name: 'Mission 7',
        launch_date_utc: '2025-03-07T00:00:00Z',
        links: {
          flickr_images: ['https://example.com/image7.jpg'],
        },
        details: 'Details for mission 7',
        rocket: {
          fairings: {
            recovered: false,
          },
        },
      },
    ];

    const result: Launch[] = launchParser(graphQlLaunches);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: '6',
      missionName: 'Mission 6',
      launchDateUtc: '2025-03-06T00:00:00Z',
      image: 'https://example.com/image6.jpg',
      details: 'Details for mission 6',
      rocketFairingsRecoveredStatus: true,
    });
    expect(result[1]).toEqual({
      id: '7',
      missionName: 'Mission 7',
      launchDateUtc: '2025-03-07T00:00:00Z',
      image: 'https://example.com/image7.jpg',
      details: 'Details for mission 7',
      rocketFairingsRecoveredStatus: false,
    });
  });
});
