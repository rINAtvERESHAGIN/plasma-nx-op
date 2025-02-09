import React from 'react';
import { RegionAutocomplete } from '@features/region-autocomplete/ui';
import { Tag } from '@shared/ui/story-tag/ui';
import { RegionContainer } from './ui.styled';
import { regionTags } from './constants';
import type { RegionTabProps } from './types';

export const getTabs = ({ selectedRegions, handleTagClick, setSelectedRegions }: RegionTabProps) => [
  {
    label: 'Федеральный округ',
    content: <div>Федеральный округ</div>
  },
  {
    label: 'Регион',
    content: (
      <RegionContainer>
        <RegionAutocomplete value={selectedRegions} onRegionChange={setSelectedRegions} />
        <div>
          {regionTags.map((tag) => (
            <Tag
              key={tag.value}
              label={tag.label}
              onClick={() => handleTagClick(tag.value)}
              color={selectedRegions.includes(tag.value) ? 'primary' : 'secondary'}
              clickable
            />
          ))}
        </div>
      </RegionContainer>
    )
  },
  {
    label: 'Населенный пункт',
    content: <div>Населенный пункт</div>
  }
];
