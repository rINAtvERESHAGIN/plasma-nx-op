import * as React from 'react';
import { useWindowResize } from '../../shared/api/hooks/use-window-resize';
import { useDock } from '../../entities/main-page-settings-dock/dock-context';
import { DockDot, DockCardButton, DockCardContainer } from './ui.styled';
import { useIsomorphicLayoutEffect, useSpringValue } from 'react-spring';

const INITIAL_WIDTH = 48;

export const DockCard = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }): JSX.Element => {
  const cardRef = React.useRef<HTMLButtonElement>(null!);
  const [elCenterX, setElCenterX] = React.useState<number>(0);

  const size = useSpringValue(INITIAL_WIDTH, {
    config: {
      mass: 0.1,
      tension: 320
    }
  });

  const opacity = useSpringValue(0);
  const y = useSpringValue(0, {
    config: {
      friction: 29,
      tension: 238
    }
  });

  const dock = useDock();

  // Обработчик изменения позиции мыши
  // useMousePosition(
  //     {
  //         onChange: ({ value }) => {
  //             const mouseX = value.x;

  //             if (dock.width > 0) {
  //                 const transformedValue =
  //                     INITIAL_WIDTH + 36 * Math.cos((((mouseX - elCenterX) / dock.width) * Math.PI) / 2) ** 12;

  //                 if (dock.hovered) {
  //                     size.start(transformedValue);
  //                 }
  //             }
  //         },
  //     },
  //     [elCenterX, dock]
  // );

  // Эффект для изменения размера карточки при потере фокуса
  useIsomorphicLayoutEffect(() => {
    if (!dock.hovered) {
      size.start(INITIAL_WIDTH);
    }
  }, [dock.hovered]);

  // Обработчик изменения размеров окна
  useWindowResize(() => {
    const { x } = cardRef.current.getBoundingClientRect();
    setElCenterX(x + INITIAL_WIDTH / 2);
  });

  const timesLooped = React.useRef(0);
  const timeoutRef = React.useRef<number>();
  const isAnimating = React.useRef(false);

  // Обработчик клика на карточку
  const handleClick = () => {
    onClick();
  };

  // Обработчик клика на карточку c анимацией
  // const handleClick = () => {
  //     if (!isAnimating.current) {
  //         isAnimating.current = true;
  //         opacity.start(0.5);
  //         timesLooped.current = 0;

  //         y.start(-INITIAL_WIDTH / 2, {
  //             loop: () => {
  //                 if (3 === timesLooped.current++) {
  //                     timeoutRef.current = setTimeout(() => {
  //                         opacity.start(0);
  //                         y.set(0);
  //                         isAnimating.current = false;
  //                         timeoutRef.current = undefined;
  //                     }, 1000);
  //                     y.stop();
  //                 }
  //                 return { reverse: true };
  //             },
  //         });
  //         onClick();
  //     } else {
  //         clearTimeout(timeoutRef.current);
  //         opacity.start(0);
  //         y.start(0);
  //         isAnimating.current = false;
  //     }
  // };

  React.useEffect(() => () => { clearTimeout(timeoutRef.current); }, []);

  return (
    <DockCardContainer>
      <DockCardButton
        ref={cardRef}
        onClick={handleClick}
        style={{
          width: size,
          height: size,
          y
        }}
      >
        {children}
      </DockCardButton>
      <DockDot style={{ opacity }} />
    </DockCardContainer>
  );
};
