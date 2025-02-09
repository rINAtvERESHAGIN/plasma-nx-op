import React, { useEffect, useRef, useState } from 'react';
import LabSelector from '@features/lab-selector/ui';
import ParameterSelector from '@features/parameter-selector/ui';
import OverviewInformationSelector from '@features/overview-information-selector/ui';
import SettingsAgeRangeSlider from '@features/settings-age-range-slider/ui';
import GenderRadioGroup from '@features/gender-radio-group/ui';
import { Container, AdditionalSelectorsContainer } from './ui.styled';

function GlobalCohortSettings(): React.ReactNode {
  const accordionRef = useRef(null);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkContainerWidth = (): void => {
      if (accordionRef.current) {
        const containerWidth = accordionRef.current.clientWidth;
        const isMobile = containerWidth <= 500;
        setIsMobileView(isMobile);
      }
    };

    checkContainerWidth();
    window.addEventListener('resize', checkContainerWidth);

    return () => {
      window.removeEventListener('resize', checkContainerWidth);
    };
  }, []);

  return (
    <>
      <Container>
        <LabSelector />
        <ParameterSelector />
        <OverviewInformationSelector />
      </Container>
      <AdditionalSelectorsContainer>
        <GenderRadioGroup />
        <SettingsAgeRangeSlider />
      </AdditionalSelectorsContainer>
    </>
  );
}

export default GlobalCohortSettings;
