import React, { useEffect, useState } from 'react';
import { SelectableButton } from '@shared/ui/sroty-selectable-button/ui';
import { ButtonGroupContainer, Container, TabContentContainer } from './ui.styled';
import type { AreaOptionGroupProps } from './types';
import { getTabs } from './tabs-builder';

export const AreaOptionGroup: React.FunctionComponent<AreaOptionGroupProps> = ({ value, onRegionChange }) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [selectedRegions, setSelectedRegions] = useState<number[]>([]);

  const handleTagClick = (regionId: number): void => {
    setSelectedRegions((prevSelectedRegions) =>
      prevSelectedRegions.includes(regionId)
        ? prevSelectedRegions.filter((id) => id !== regionId)
        : [...prevSelectedRegions, regionId]
    );
  };

  const tabs = getTabs({
    selectedRegions,
    handleTagClick,
    setSelectedRegions
  });

  useEffect(() => {
    onRegionChange(selectedRegions);
  }, [selectedRegions, onRegionChange]);

  useEffect(() => {
    if (value !== selectedRegions) {
      setSelectedRegions(value);
    }
  }, [value]);

  return (
    <Container>
      <ButtonGroupContainer>
        {tabs.map((tab, index) => (
          <SelectableButton
            key={tab.label}
            label={tab.label}
            isActive={activeTab === index}
            onClick={() => {
              setActiveTab(index);
            }}
          />
        ))}
      </ButtonGroupContainer>
      <TabContentContainer>{tabs[activeTab].content}</TabContentContainer>
    </Container>
  );
};
