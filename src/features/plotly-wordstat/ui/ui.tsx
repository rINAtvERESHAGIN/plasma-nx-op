import React, { useEffect, useState } from 'react';
import { Box, Skeleton, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useActiveRegion } from '@shared/model/useActiveRegion';
import DatasetSpecificationChart from '@entities/dataset-specification-chart/ui';
import WordStatParametersAccordion from '../wordstat-parameters-accordion/wordstat-parameters-accordion';
import { withConnectPlot } from '@shared/ui/plotly-interaction/with-diagram';
import { dispatchCustomEvent } from '../customEvents';
import { ChartIds } from '@entities/dataset-specification-chart/constants';
import { type ChartId } from '@shared/api/model/ChartId';
import { WordStatService } from '@shared/api/services/WordStatService';

const PlotlyInteraction = withConnectPlot(DatasetSpecificationChart);

const SkeletonWordStat: React.FunctionComponent = () => {
  return (
    <>
      <Skeleton variant="rectangular" width="95%" height="20px" paddingBottom="10px" />
      <Skeleton variant="rectangular" width="95%" height="450px" />
    </>
  );
};

const WordStat: React.FunctionComponent = () => {
  const chartId: ChartId = ChartIds.WORDSTAT_PLOTLY;
  const region = useActiveRegion();
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhrase, setSelectedPhrase] = useState<string | null>(null);
  const [frequency, setFrequency] = useState<string>('weekly');
  const [checked, setChecked] = useState<boolean>(false);

  const currentYear = new Date().getFullYear();
  const firstDayOfYear = new Date(currentYear, 0, 1);
  const [startDate, setStartDate] = useState<Date | null>(firstDayOfYear);
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const [chartData, setChartData] = useState<any>(undefined);

  useEffect(() => {
    const getChart = async (): Promise<void> => {
      try {
        const response = await WordStatService.requestGetPhrases();
        const responseData = JSON.parse(response);
        setData(responseData.phrases || []);
      } catch (e) {
        setError('Ошибка загрузки данных.');
      } finally {
        setLoading(false);
      }
    };
    getChart();
  }, []);

  useEffect(() => {
    const sendRequest = async (): Promise<void> => {
      if (!selectedPhrase || !region.data.iso_code) {
        setError('Выберите фразу');
        dispatchCustomEvent('wordStatDataUpdate', null);
        return;
      }

      try {
        const response = await WordStatService.requestSendPhrase({
          phrase: selectedPhrase,
          iso_code: region.data.iso_code,
          period_type: frequency,
          period_start: startDate ? startDate.toLocaleDateString('ru-RU') : null,
          period_end: endDate ? endDate.toLocaleDateString('ru-RU') : null
        });
        setChartData(response);
        setError(null);
        checked && dispatchCustomEvent('wordStatDataUpdate', response);
      } catch (e) {
        setError('Ошибка отправки данных.');
      }
    };

    sendRequest();
  }, [selectedPhrase, frequency, startDate, endDate, region.data.iso_code, checked]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (!event.target.checked) dispatchCustomEvent('wordStatDataUpdate', null);
    else if (chartData) dispatchCustomEvent('wordStatDataUpdate', chartData);
  };

  return (
    <Box sx={{ padding: '9px 9px 0 9px' }}>
      <WordStatParametersAccordion
        data={data}
        selectedPhrase={selectedPhrase}
        setSelectedPhrase={setSelectedPhrase}
        frequency={frequency}
        setFrequency={setFrequency}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      {loading ? (
        <SkeletonWordStat />
      ) : error ? (
        <Typography sx={{ paddingTop: '9px' }}>{error}</Typography>
      ) : chartData !== undefined ? (
        <>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
            label="Добавить в Долгосрочный тренд"
            sx={{ padding: '2px 0 15px 0' }}
          />
          <PlotlyInteraction chartId={chartId} plotData={chartData} fullParentHeight={true} />
        </>
      ) : null}
    </Box>
  );
};

export default WordStat;
