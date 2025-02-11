import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Dock } from '../../entities/main-page-settings-dock/ui/ui';
import { DockCard } from '../../features/main-page-settings-dock-card/ui';
import { Card } from '../../entities/maip-page-settings-card/ui';
import { useAppSelector } from '@org/store-redux';
import { Body, DividerLine, Dot } from './ui.styled';
import Icons from './dock-icons';

const SettingsDock = () => {
  const openSettings = useAppSelector((state) => state.ui.openSettings);
  const openTimeLine = useAppSelector((state) => state.ui.openTimeLine);
  const [dotWidth, setDotWidth] = useState(200);
  const [isDockVisible, setIsDockVisible] = useState(false);

  // Определяем, находится ли курсор в заданной области,
  // и отображаем Dock и Dot в зависимости от этого.
  const handleMouseMove = (event) => {

    const thresholdVertical = window.innerHeight / 7;
    const thresholdHorizontal = window.innerWidth / 4.5;

    const distanceToBottom = window.innerHeight - event.clientY;
    const distanceToCenter = Math.abs(window.innerWidth / 2 - event.clientX);

    const isNearBottom = distanceToBottom < thresholdVertical;
    const isNearCenter = distanceToCenter < thresholdHorizontal;

    setIsDockVisible(isNearBottom && isNearCenter);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight;
    const radius = 300;
    
    // Проверяем, находится ли курсор внутри полукруга
    const isInsideHalfCircle = Math.pow(event.clientX - centerX, 2) + Math.pow(event.clientY - centerY, 2) <= Math.pow(radius, 2);
    
    if (isInsideHalfCircle) {
      // Вычисляем расстояние до центра
      const distanceToCenter = Math.sqrt(Math.pow(event.clientX - centerX, 2) + Math.pow(event.clientY - centerY, 2));
      const maxDotWidth = 200;
      const newDotWidth = Math.min(maxDotWidth, (distanceToCenter / radius) * maxDotWidth);

      setDotWidth(newDotWidth);
    }
  };
    
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  // TODO Декомпозировать компонент иконок
  const ICONS = Icons({ openSettings, openTimeLine }); 

  const dockAnimation = useSpring({
    opacity: isDockVisible ? 1 : 0
    // transform: `translateY(${isDockVisible ? 0 : 30}px)`,
  });

  return (
    <div style={{position: 'relative',zIndex: '1000'}}>
      <Dot style={{ width: `${dotWidth}px` }} />
      <animated.div style={dockAnimation}>
        {isDockVisible && (
          <Body>
            <Dock>
              {ICONS.map((item, index) =>
                item.icon ? (
                  <DockCard key={index} onClick={item.action}>
                    <Card title={item.name}>
                      <item.icon />
                    </Card>
                  </DockCard>
                ) : (
                  <DividerLine key={index} />
                )
              )}
            </Dock>
          </Body>
        )}
      </animated.div>
    </div>
  );
};

export default SettingsDock;
