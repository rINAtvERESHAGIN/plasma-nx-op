import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';
import { Box } from '@mui/material';
import { PlateMapCellContent } from './ui';

export default {
  title: 'PlateMapCell',
  component: PlateMapCellContent,
  argTypes: {
    timelineDate: []
  }
} as ComponentMeta<typeof PlateMapCellContent>;

const Template: ComponentStory<typeof PlateMapCellContent> = (args) => (
  <Box width={90} height={90}><PlateMapCellContent {...args} /></Box>
);

export const FullMapCell = Template.bind({});

FullMapCell.args = {
  children: 'RU-AD',
  onClick: () => {
  },
  colorMarker: 0.466637673278526,
  date: '2016-02-01',
  detector_now: 0.466637673278526,
  name: 'Республика Адыгея',
  code: 'RU-AD'
};
