import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LaunchCard, { LaunchCardDependencies, LaunchCardProps } from '../LaunchCard';
import dayjs from 'dayjs';

const mockProps: LaunchCardProps = {
  id: '1',
  missionName: 'Test Mission',
  launchDateUtc: '2023-07-01T12:00:00Z',
  image: '/test-image-url',
  details: 'This is a test mission with detailed information about the launch.',
  rocketFairingsRecoveredStatus: true,
};

describe('LaunchCard Component', () => {
  const getMocks = (overrides?: Partial<LaunchCardDependencies>): LaunchCardDependencies => ({
    LaunchImage: ({ missionName, image }) => (
      <>
        <p data-testid="testLaunchImageMission">{missionName}</p>
        <p data-testid="testLaunchImageUrl">{image}</p>
      </>
    ),
    ...overrides,
  });

  it('renders mission name', () => {
    // when
    render(<LaunchCard {...mockProps} />);

    // then
    expect(screen.getByTestId('missionName')).toHaveTextContent(mockProps.missionName);
  });

  it('renders launch date in correct format', () => {
    // when
    render(<LaunchCard {...mockProps} />);
    const formattedDate = dayjs(mockProps.launchDateUtc).format('DD-MM-YYYY HH:mm:ss');

    // then
    expect(screen.getByTestId('missionDate')).toHaveTextContent(formattedDate);
  });

  it('renders details with truncation if over 200 characters', () => {
    // when
    const longDetails = 'A'.repeat(250);
    render(<LaunchCard {...mockProps} details={longDetails} />);

    // then
    expect(screen.getByTestId('missionDetails')).toHaveTextContent(`${'A'.repeat(200)}...`);
  });

  it('renders full details if under 200 characters', () => {
    // when
    render(<LaunchCard {...mockProps} />);

    // then
    expect(screen.getByTestId('missionDetails')).toHaveTextContent(mockProps.details);
  });

  it('renders rocket fairings recovery status correctly', () => {
    // when
    render(<LaunchCard {...mockProps} />);
    expect(screen.getByTestId('missionFairingsRecovered')).toHaveTextContent('Recovered');
  });

  it('renders not recovered status when false', () => {
    // when
    render(<LaunchCard {...mockProps} rocketFairingsRecoveredStatus={false} />);

    // then
    expect(screen.getByTestId('missionFairingsRecovered')).toHaveTextContent('Not recovered');
  });

  it('renders launch image component', () => {
    // when
    const mocks = getMocks();
    render(<LaunchCard {...mockProps} overrides={mocks} />);

    // then
    expect(screen.getByTestId('testLaunchImageMission')).toHaveTextContent(mockProps.missionName);
    expect(screen.getByTestId('testLaunchImageUrl')).toHaveTextContent(mockProps.image);
  });
});
