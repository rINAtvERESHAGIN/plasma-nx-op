import { Button, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { bull } from '../bull/ui';
import './styles/ripple-effect.css';
interface Info {
    id: string;
    label: string;
    data: React.ReactNode | string | number;
}

interface InfoProps {
    info: Info;
    onClick?: () => void;
}

const TextContainer = styled.div`
    &:hover {
        /* background-color: rgba(0, 0, 0, 0.12); */
        border-radius: 8px;
        cursor: pointer;
    }
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    gap: 8px;
    padding: 8px;
`;

function Info({ info, onClick }: InfoProps): React.ReactNode {
  return (
    <Button onClick={onClick}>
      <TextContainer>
        <Typography variant="h6" component="div">
          {bull}
        </Typography>
        <Typography variant="body1" component="div">
          {info.label}:
        </Typography>
        <Typography variant="body2">{info.data}</Typography>
      </TextContainer>
    </Button>
  );
}

export default Info;
