export interface RoundAlarmProps {
  size: 'xs' | 's' | 'm' | 'l' | 'xl';
  type: 'alarm' | 'warning' | 'access' | 'neutral';
}

export interface ProInflammatoryIndicatorsTableProps {
  onRowClick: (regionId: number | null) => void;
}
