import React from 'react';
import { type ComponentStory } from '@storybook/react';
import { Box } from '@mui/material';
import { PlateMapHeaderBar } from './ui';

export default {
  title: 'PlateMapHeaderBar',
  component: PlateMapHeaderBar,
  argTypes: {}
};

const Template: ComponentStory<typeof PlateMapHeaderBar> = (args) => (
  <Box width="70%" display="flex">
    <PlateMapHeaderBar position="static" />
  </Box>
);

export const DefaultPlateMapHeaderBar = Template.bind({});
DefaultPlateMapHeaderBar.args = {};
