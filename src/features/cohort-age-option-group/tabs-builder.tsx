import { RadioGroupContainer } from './ui.styled';
import type { AgeTabProps } from './types';
import { isNil } from 'lodash';
import { ageGroupRadioOptions } from './constants';
import CustomRadioButton from '../../shared/ui/radio-button/ui';
import RangeSlider from '../../shared/ui/range-slider/ui';

export const getTabs = ({ selectedRadio, setSelectedRadio, onAgeChange, ageValue }: AgeTabProps) => {
  const handleRadioClick = (value: string) => {
    setSelectedRadio(value);
    const selectedOption = ageGroupRadioOptions.find((opt) => opt.value === value);
    if (!isNil(selectedOption)) onAgeChange(selectedOption.range);
  };

  return [
    {
      label: 'Возрастная группа',
      content: (
        <RadioGroupContainer>
          {ageGroupRadioOptions.map((option) => (
            <CustomRadioButton
              key={option.value}
              value={option.value}
              label={option.label}
              icon={null}
              selected={selectedRadio === option.value}
              onClick={handleRadioClick}
            />
          ))}
        </RadioGroupContainer>
      )
    },
    {
      label: 'Дата рождения',
      content: <div>Дата рождения</div>
    },
    {
      label: 'Детальная настройка',
      content: <RangeSlider min={0} max={100} step={5} marks value={ageValue} onChange={onAgeChange} />
    }
  ];
};
