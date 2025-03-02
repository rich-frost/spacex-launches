import dayjs from 'dayjs';
import LaunchImage from '../LaunchImage';
import './index.css';

const dependencies = {
  LaunchImage,
};

export type LaunchCardDependencies = typeof dependencies;

export type LaunchCardProps = {
  id: string;
  missionName: string;
  launchDateUtc: string;
  image: string;
  details: string;
  rocketFairingsRecoveredStatus: boolean;
  overrides?: typeof dependencies;
};

const LaunchCard = ({
  missionName,
  image,
  launchDateUtc,
  details,
  rocketFairingsRecoveredStatus,
  overrides,
}: LaunchCardProps) => {
  const deps = { ...dependencies, ...overrides };

  const charsInDetails = details?.split('');
  let formattedDetails = details;
  if (charsInDetails?.length > 200) {
    formattedDetails = `${details?.split('').slice(0, 200).join('')}...`;
  }

  return (
    <li className="launch-card">
      <div className="launch-card-details-container">
        <h2 data-testid="missionName">
          <span className="launch-card-title"> Mission: </span>
          {missionName}
        </h2>
        <p data-testid="missionDetails" className="launch-card-details">
          <span className="launch-card-title">Details: </span>
          {formattedDetails}
        </p>
        <p data-testid="missionDate">
          <span className="launch-card-title">Launch Date: </span>
          {dayjs(launchDateUtc).format('DD-MM-YYYY HH:mm:ss')}
        </p>
        <p data-testid="missionFairingsRecovered">
          <span className="launch-card-title">Rocket Fairings Recovered Status: </span>
          {rocketFairingsRecoveredStatus === true ? 'Recovered' : 'Not recovered'}
        </p>
      </div>
      <div className="launch-card-image-container">
        <deps.LaunchImage missionName={missionName} image={image} />
      </div>
    </li>
  );
};

export default LaunchCard;
