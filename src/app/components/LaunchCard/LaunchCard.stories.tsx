import type { Meta, StoryObj } from '@storybook/react';
import LaunchCard from './';

const defaultArgs = {
  id: '1',
  missionName: 'Falcon',
  image: 'https://farm9.staticflickr.com/8638/16855192031_962f7b1113_o.jpg',
  launchDateUtc: '2007-03-21T01:10:00.000Z',
  details: 'Engine failure at 33 seconds and loss of vehicle',
  rocketFairingsRecoveredStatus: true,
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
/** Card component used to display launch details */
const meta = {
  title: 'LaunchCard',
  component: LaunchCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    missionName: { control: 'text' },
    image: { control: 'text' },
    launchDateUtc: { control: 'text' },
    details: { control: 'text' },
    rocketFairingsRecoveredStatus: { control: 'boolean' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: defaultArgs,
} satisfies Meta<typeof LaunchCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: defaultArgs,
};
