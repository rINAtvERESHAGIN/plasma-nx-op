import * as React from 'react';
import { ReflexContainer, ReflexElement, type ReflexElementProps, ReflexSplitter } from 'react-reflex';
import 'react-reflex/styles.css';
import '../../shared/styles/scroll.css';
import './styles.css';
import { FirstPanelContainer, PanelCloseButton, SecondCenterContainer, ThirdCenterContainer } from './ui.styled';

interface IReflexControlsDemo {
  map: React.ReactNode;
  charts: React.ReactNode;
  blocknote: React.ReactNode;
}

type PanelLiterals = 'panel1' | 'panel2' | 'panel3';
interface State extends Record<PanelLiterals, ReflexElementProps> {}

class ReflexControlsDemo extends React.PureComponent<React.PropsWithChildren<IReflexControlsDemo>, State> {
  public panel1 = React.createRef(null);

  public panel2 = React.createRef(null);

  public panel3 = React.createRef(null);

  constructor(props) {
    super(props);
    this.onMinimizeClicked = this.onMinimizeClicked.bind(this);
    this.onMaximizeClicked = this.onMaximizeClicked.bind(this);
    this.getSize = this.getSize.bind(this);
    this.state = {
      panel1: {
        name: 'panel1',
        size: window.innerWidth / 2,
        direction: 1
      },
      panel2: {
        name: 'panel2',
        size: window.innerWidth / 2.5
      },
      panel3: {
        name: 'panel3',
        minSize: 0,
        size: window.innerWidth / 5,
        direction: -1
      }
    };
  }

  onMinimizeClicked(panelIndex: string) {
    const currentSize = this.getSize(panelIndex);
    const minSize = 0;
    const update = async (size) =>
      await new Promise((resolve) => {
        this.setState(
          {
            ...this.state,
            [panelIndex]: {
              ...this.state[panelIndex],
              size: size < minSize ? minSize : size
            }
          },
          () => {
            resolve();
          }
        );
      });

    const done = (from, to) => from < to;
    const speed = -80;
    this.animate(currentSize, 0, speed, done, update);
  }

  onMaximizeClicked(panelIndex: string) {
    const currentSize = this.getSize(panelIndex);
    const update = async (size) =>
      await new Promise((resolve) => {
        this.setState(
          {
            ...this.state,
            [panelIndex]: {
              ...this.state[panelIndex],
              size: window.innerWidth / 3
            }
          },
          () => {
            resolve();
          }
        );
      });

    const done = (from, to): boolean => from > to;
    const speed = 80;
    this.animate(currentSize, window.innerWidth / 3, speed, done, update);
  }

  getSize(panelIndex: string): number {
    const domElement = this[panelIndex];

    return domElement.current.offsetWidth;
  }

  // Функция для установки стилей размытия в зависимости от ширины, для первой панели

  // applyPanel1BlurEffect = () => {
  //     const panel1Element = this.panel1.current;
  //     const newSize = panel1Element.clientWidth;
  //
  //     const blurLevel = Math.min((300 - newSize) / 10, 100);
  //
  //     if (newSize < 300) {
  //         panel1Element.style.filter = `blur(${blurLevel}px)`;
  //         panel1Element.style.pointerEvents = 'none';
  //     } else {
  //         panel1Element.style.filter = 'none';
  //         panel1Element.style.pointerEvents = 'auto';
  //     }
  // };

  onResize = (): void => {
    // this.applyPanel1BlurEffect();
    window.dispatchEvent(new Event('resize'));
  };

  animate(start: number, end: number, step: number, done: boolean, fn: () => Promise<void>): void {
    const stepFn = () => {
      if (!done(start, end)) {
        const calc = (start += step);
        fn(calc).then(() => {
          window.requestAnimationFrame(stepFn);
        });
      }
    };

    stepFn();
  }

  getMinSize() {
    const allWidth = document.body.clientWidth;
    return allWidth * (7 / 100);
  }

  toggleMinMaxPanelSize = (panelName: PanelLiterals): void => {
    const size = this.getSize(panelName);
    if (size > 200) {
      this.onMinimizeClicked(panelName);
    } else {
      this.onMaximizeClicked(panelName);
    }
  };

  render(): React.ReactNode {
    const { panel1, panel2, panel3 } = this.state;
    const { map, charts, blocknote } = this.props;

    return (
      <ReflexContainer orientation="vertical">
        <ReflexElement
          className="scroll-container"
          size={panel1.size}
          direction={panel1.direction}
          name={panel1.name}
          onResize={this.onResize}
          minSize={this.getMinSize()}
        >
          <FirstPanelContainer ref={this.panel1}>{map ?? null}</FirstPanelContainer>
        </ReflexElement>

        <ReflexSplitter propagate className="custom-reflex-splitter">
          <PanelCloseButton
            panelSize={panel1.size}
            isReversed={false}
            onClick={() => { this.toggleMinMaxPanelSize(panel1.name as PanelLiterals); }}
          >
            <span aria-label="Upper visual toggle"></span>
            <span aria-label="Lower visual toggle"></span>
          </PanelCloseButton>
        </ReflexSplitter>

        {/* center */}
        <ReflexElement className="scroll-container" size={panel2.size} name={panel2.name} onResize={this.onResize}>
          <SecondCenterContainer ref={this.panel2}>{blocknote ?? null}</SecondCenterContainer>
        </ReflexElement>

        <ReflexSplitter propagate className="custom-reflex-splitter">
          <PanelCloseButton
            panelSize={panel3.size}
            isReversed={true}
            onClick={() => { this.toggleMinMaxPanelSize(panel3.name as PanelLiterals); }}
          >
            <span aria-label="Upper visual toggle"></span>
            <span aria-label="Lower visual toggle"></span>
          </PanelCloseButton>
        </ReflexSplitter>

        {/* right */}
        <ReflexElement
          name={panel3.name}
          className="scroll-container"
          size={panel3.size}
          direction={panel3.direction}
          onResize={this.onResize}
        >
          <ThirdCenterContainer ref={this.panel3}>{charts ?? null}</ThirdCenterContainer>
        </ReflexElement>
      </ReflexContainer>
    );
  }
}

export default ReflexControlsDemo;
