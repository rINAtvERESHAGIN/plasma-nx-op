import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { IconMap, StyledFloatingLabel } from './ui.styled';

const Icon = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <IconMap />
  </div>
));

function calculatePercentage (number: number, percentage: number): number {
  return (number * percentage) / 100;
}

interface FloatingLabelProps {
  icon: React.ReactNode
  text: string
}

function FloatingLabel ({ icon, text }: FloatingLabelProps): React.ReactNode {
  const [isHovered, setIsHovered] = useState(false);
  const debouncedSetIsHovered = debounce(setIsHovered, 200);
  const [showBefore, setShowBefore] = useState<undefined | number>(0);
  const iconRef = useRef(null);
  const floatingLabelRef = useRef();

  useEffect(() => {
    const handleScroll = (): void => {
      debouncedSetIsHovered(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnter = (): void => {
    debouncedSetIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    debouncedSetIsHovered(false);
  };

  useEffect(() => {
    if (iconRef && iconRef.current && floatingLabelRef?.current) {
      setShowBefore(
        100 -
                    Number.parseInt(
                      calculatePercentage(iconRef.current.offsetWidth, floatingLabelRef.current.offsetWidth).toFixed()
                    )
      );
    }
  }, [iconRef.current, floatingLabelRef]);

  return (
    <StyledFloatingLabel
      ref={floatingLabelRef}
      showBefore={showBefore}
      isHovered={isHovered}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon ref={iconRef} />
      {/* <Text isHovered={isHovered}>Карта регионов</Text> */}
    </StyledFloatingLabel>
  );
}

export default FloatingLabel;
