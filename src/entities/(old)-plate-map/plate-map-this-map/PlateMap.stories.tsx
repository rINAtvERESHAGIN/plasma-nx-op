import React from 'react';

import { type ComponentStory, type ComponentMeta } from '@storybook/react';
import { PlateMap } from './ui';
import plateMapRussionRegionAsCodeName from './plate-map-russion-region.json';
import regionDataByDay from '../../../shared/config/data/final-ready-data-by-day.json';

export default {
  title: 'PlateMap',
  component: PlateMap,
  argTypes: {
    regions: {},
    gridRegionMapTemplate: []
  }
} as ComponentMeta<typeof PlateMap>;

const Template: ComponentStory<typeof PlateMap> = (args) => <PlateMap {...args} />;

const grid = JSON.parse(plateMapRussionRegionAsCodeName);
const regionsDataByDay = JSON.parse(regionDataByDay);

export const DefaultMap = Template.bind({});

DefaultMap.args = {
  regions: regionsDataByDay,
  gridRegionMapTemplate: grid
};
