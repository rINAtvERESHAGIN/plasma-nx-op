import React from 'react';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-left: 5px;
`;

interface SwitchButtonProps {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SwitchButton = ({ label, checked, onChange }: SwitchButtonProps): React.ReactNode => {
  return (
    <Container>
      <Typography>{label}</Typography>
      <Switch checked={checked} onChange={onChange} inputProps={{ 'aria-label': 'Switch' }} />
    </Container>
  );
};

export default SwitchButton;
