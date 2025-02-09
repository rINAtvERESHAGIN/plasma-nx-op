export interface AreaOptionGroupProps {
  value: number[];
  onRegionChange: (regionIds: number[]) => void;
}

export interface RegionTabProps {
  selectedRegions: number[];
  handleTagClick: (regionId: number) => void;
  setSelectedRegions: (regions: number[]) => void;
}
