import React, { useState } from 'react';
import { SelectableButton } from '@shared/ui/sroty-selectable-button/ui';
import { ButtonGroupContainer, Container, TabContentContainer } from './ui.styled';
import type { AgeOptionGroupProps } from './types';
import { getTabs } from './tabs-builder';

export const AgeOptionGroup: React.FunctionComponent<AgeOptionGroupProps> = ({ ageValue, onAgeChange }) => {
  const [selectedRadio, setSelectedRadio] = useState<string>('2');
  const [activeTab, setActiveTab] = useState<number>(2);

  const tabs = getTabs({
    selectedRadio,
    ageValue,
    setSelectedRadio,
    onAgeChange
  });

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
