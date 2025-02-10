import React, { useEffect, useRef, useState } from 'react';
import { Container, AdditionalSelectorsContainer } from './ui.styled';
import GenderRadioGroup from '../gender-radio-group/ui';
import LabSelector from '../lab-selector/ui';
import OverviewInformationSelector from '../overview-information-selector/ui';
import ParameterSelector from '../parameter-selector/ui';
import SettingsAgeRangeSlider from '../settings-age-range-slider/ui';

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
