import { ArrowBackIos } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { ReflexElement, type ReflexElementProps, ReflexSplitter } from 'react-reflex';
import 'react-reflex/styles.css';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  position: relative;
`;

const ColumnHeaderContainer = styled.div<{ isClose?: boolean }>`
  padding: 8px;
  position: absolute;
  top: 0;
  right: 0;
  /* left: 0; */
  transform: ${(props) => (props.isClose ? 'rotate(180deg)' : 'rotate(0)')};
`;

interface Props {
  children: React.ReactNode;
  onResize: ReflexElementProps['onResize'];
}

class ControlledElementCls extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onLockSizeClicked = this.onLockSizeClicked.bind(this);

    this.onMinimizeClicked = this.onMinimizeClicked.bind(this);

    this.onMaximizeClicked = this.onMaximizeClicked.bind(this);

    this.state = {
      size: -1
    };
  }

  onLockSizeClicked(): void {
    this.props.onLockSize({
      locked: this.props.sizeLocked,
      paneId: this.props.id,
      size: this.getSize()
    });
  }

  onMinimizeClicked(): void {
    const currentSize = this.getSize();
    const minSize = 1;
    const update = async (size): Promise<unknown> => {
      return await new Promise((resolve) => {
        this.setState(
          {
            size: size < minSize ? minSize : size
          },
          () => {
            resolve();
          }
        );
      });
    };

    const done = (from, to): boolean => {
      return from < to;
    };
    const speed = -80;
    this.animate(currentSize, 0, speed, done, update);
  }

  onMaximizeClicked(): void {
    const currentSize = this.getSize();

    const update = async (size): Promise<unknown> => {
      return await new Promise((resolve) => {
        this.setState(
          {
            size
          },
          () => {
            resolve();
          }
        );
      });
    };

    const done = (from, to): boolean => {
      return from > to;
    };
    const speed = 80;
    this.animate(currentSize, 400, speed, done, update);
  }

  getSize() {
    const domElement = ReactDOM.findDOMNode(this);

    switch (this.props.orientation) {
      case 'horizontal':
        return domElement.offsetHeight;

      case 'vertical':
        return domElement.offsetWidth;

      default:
        return 0;
    }
  }

  animate(start, end, step, done, fn): void {
    const stepFn = (): void => {
      if (!done(start, end)) {
        fn((start += step)).then(() => {
          window.requestAnimationFrame(stepFn);
        });
      }
    };

    stepFn();
  }

  render(): React.ReactNode {
    const { children, onResize, ...otherProps } = this.props;

    return (
      <React.Fragment>
        <ReflexElement onResize={onResize} size={this.state.size} {...otherProps}>
          <Container>
            <ColumnHeaderContainer>
              <IconButton aria-label="delete" size="small" onClick={this.onMinimizeClicked}>
                <ArrowBackIos fontSize="inherit" />
              </IconButton>
            </ColumnHeaderContainer>
            {children}
          </Container>
        </ReflexElement>
        <ReflexSplitter />
      </React.Fragment>
    );
  }
}

export default ControlledElementCls;
