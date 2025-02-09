export interface AgeOptionGroupProps {
  ageValue: number[];
  onAgeChange: (value: number[]) => void;
}
export interface AgeTabProps {
  selectedRadio: string;
  setSelectedRadio: (value: string) => void;
  onAgeChange: (range: number[]) => void;
  ageValue: number[];
}
