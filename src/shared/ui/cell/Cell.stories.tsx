import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Box } from '@mui/material';
import React from 'react';
import { Cell } from './ui';
import { type PlateMapCellContent } from '../../../entites/plate-map-cell/ui';

export default {
  title: 'Cell',
  component: Cell,
  argTypes: {
    timelineDate: []
  }
} as ComponentMeta<typeof PlateMapCellContent>;

const Template: ComponentStory<typeof Cell> = (args) => (
  <Box width={90} height={90}><Cell {...args} /></Box>
);

export const CellWithOutAction = Template.bind({});

CellWithOutAction.args = {
  isClickable: undefined,
  children: 'No Click'
};

export const CellWithAction = Template.bind({});

CellWithAction.args = {
  isClickable: true,
  children: 'Click'
};

export const CellWithActionColor = Template.bind({});

CellWithActionColor.args = {
  isClickable: true,
  children: 'Click',
  colorMarker: 0
};
