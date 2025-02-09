import { type RoundAlarmProps } from './type';
import { ProInflammatoryIndicatorsTableService } from '@shared/api/services/ProInflammatoryIndicatorsTableService';
import { type ProInflammatoryIndicators } from '@shared/api/model/ProInflammatoryIndicatorsTableData';

export const getProInflammatoryIndicatorsTableData = async (): Promise<ProInflammatoryIndicators[] | undefined> => {
  try {
    const response = await ProInflammatoryIndicatorsTableService.requestGetProInflammatoryIndicatorsTable();
    const responseData = JSON.parse(response);
    return responseData.data.map((item: any) => ({
      date: item.date,
      districtName: item.district_name,
      region: item.region,
      typeOfGrowthLabel: item.type_of_growth_label,
      weeklyCrpAvgSmoothedDelta: item.weekly_CRP_avg_smoothed_delta,
      weeklySiriAvgSmoothedDelta: item.weekly_SIRI_avg_smoothed_delta
    }));
  } catch (e) {
    console.error('Ошибка загрузки данных:', e);
  }
};

export const getTypeOfGrowthLabel = (typeOfGrowthLabel: string): RoundAlarmProps['type'] => {
  switch (typeOfGrowthLabel) {
    case 'Экспоненциальный рост':
      return 'alarm';
    case 'Линейный рост':
      return 'warning';
    case 'Хаотичное поведение':
      return 'neutral';
    case 'Линейный спад':
      return 'access';

    default:
      return 'neutral';
  }
};
