import React, { useCallback, useEffect, useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppDispatch } from '@app/store';
import { updateComparison } from '@pages/traces/model';
import dayjs, { type Dayjs } from 'dayjs';
import { comparisonDefaultDate } from '@shared/ui/date-picker/lib/constant';
import useDebounce from '../../../entities/timeline-geo-map-slider/use-debounce';

const ComparisonDatePicker: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const [date, setDate] = useState<Dayjs>(dayjs(comparisonDefaultDate));

  const handleOnChange = useCallback(
    (newValue: Dayjs): void => {
      if (newValue) {
        setDate(newValue);
      }
    },
    [date]
  );

  const debounceValue = useDebounce(date?.toISOString(), 1000);

  useEffect((): void => {
    if (debounceValue) {
      dispatch(updateComparison({ date: debounceValue }));
    }
  }, [debounceValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Дата" value={date} onChange={handleOnChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
};
export default ComparisonDatePicker;
