export interface CustomRadioButtonProps {
  value: string;
  label: string;
  selected: boolean;
  icon: any;
  disabled?: boolean;
  onClick: (value: string) => void;
}
