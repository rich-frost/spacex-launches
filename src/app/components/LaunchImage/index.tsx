import Image from 'next/image';
import './index.css';

export type LaunchImageProps = {
  missionName: string;
  image: string;
};

const LaunchImage = ({ missionName, image }: LaunchImageProps) => {
  if (!image) return;
  return <Image src={image} width={500} height={300} alt={`${missionName} launch image`} />;
};

export default LaunchImage;
