import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styled from 'styled-components';
import CustomRadioButton from '../radio-button/ui';

export interface IRadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface IRadioButtonsGroupProps {
  label: string;
  data: IRadioOption[];
  onChange: (value: string) => void;
  selectedValue: string | undefined;
}

const StyledFormControl = styled(FormControl)`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const StyledRadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const RadioButtonsGroup = ({ label, data, onChange, selectedValue }: IRadioButtonsGroupProps): React.ReactNode => {
  return (
    <StyledFormControl>
      <FormLabel>{label}</FormLabel>
      <StyledRadioGroup>
        {data.map((item, index) => (
          <CustomRadioButton
            key={`radio_${index}`}
            value={item.value}
            label={item.label}
            icon={item.icon}
            selected={selectedValue === item.value}
            disabled={item.disabled}
            onClick={onChange}
          />
        ))}
      </StyledRadioGroup>
    </StyledFormControl>
  );
};

export default RadioButtonsGroup;
