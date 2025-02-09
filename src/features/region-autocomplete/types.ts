import { type Region } from '@shared/model/regions';

export interface RegionOption {
  label: string;
  value: Region;
}

export type RegionChangeHandler = (event: React.SyntheticEvent, newValue: RegionOption | null) => void;

export interface RegionAutocompleteProps {
  onRegionChange: (regionIds: number[]) => void;
  value?: number[];
}
