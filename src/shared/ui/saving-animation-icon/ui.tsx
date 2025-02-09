import './styles.css';
import styled, { keyframes } from 'styled-components';

export type StatusLoadingIcon = 'progress' | 'complete';
interface IProps {
  status: StatusLoadingIcon;
}

const loaderAnimation = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

const SaveIcon = styled.div<{ status: StatusLoadingIcon }>`
  @keyframes pop {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  position: relative;
  background: white;
  height: 24px;
  width: 23px;
  display: block;
  border-radius: 3px;
  border: 1px solid black;
  padding-top: 10px;
  margin: 20px 20px 20px 20px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    border-width: 0 7px 7px 0;
    border-style: solid;
    border-color: #a4a6a7 #3c4145;
  }

  &:after {
    content: '✓';
    color: green;
    font-size: 20px;
    position: absolute;
    top: 17%;
    left: 23%;
    transform: scale(0);
    animation: ${(props) => (props.status === 'complete' ? 'pop 0.5s 3s forwards' : 'none')};
  }
`;

const Loader = styled.div<{ status: StatusLoadingIcon }>`
  @keyframes fade-loaders {
    0% {
      opactity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  background: #e2e2e2;
  width: 80%;
  height: 10%;
  display: block;
  margin: 3px auto;
  position: relative;
  overflow: hidden;
  animation: ${(props) => (props.status === 'complete' ? 'fade-loaders 0.2s 3s forwards;' : 'none')};

  &:after {
    content: '';
    background: #2c3033;
    width: 0;
    height: 5px;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:first-child:after {
    animation: ${loaderAnimation};
    animation-duration: 0.8s;
    animation-delay: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
  }

  &:nth-child(2n):after {
    animation: ${loaderAnimation};
    animation-duration: 0.7s;
    animation-delay: 1.8s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
  }

  &:nth-child(3n):after {
    animation: ${loaderAnimation};
    animation-duration: 0.6s;
    animation-delay: 2.6s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
  }
`;

const SavingAnimationIcon = ({ status }: IProps): React.ReactNode => {
  return (
    <SaveIcon status={status}>
      {Array.from(Array(3).keys()).map((number) => (
        <Loader key={number} status={status} />
      ))}
    </SaveIcon>
  );
};

export default SavingAnimationIcon;
