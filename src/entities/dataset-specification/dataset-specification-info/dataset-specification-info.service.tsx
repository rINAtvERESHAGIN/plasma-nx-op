import { Chip, Typography } from '@mui/material';
import { getFormattedDate } from '../../comparison-selected-status/lib/helper';
import * as React from 'react';
import { sexMapping } from './dataset-specification-info.config';
import { AgeContainer } from './dataset-specification-info.styled';
import { type DatasetSpecificationInfoType, type SexMapping } from './dataset-specification-info.types';

class DatasetSpecificationInfoService {
  public formatDatasetSpecificationInfo(cohort, labs, parameters, region): DatasetSpecificationInfoType {
    console.log('DatasetSpecificationInfoService', cohort);
    return {
      settings: {
        id: 'settings',
        label: 'Параметры',
        data:
          cohort.selectedParameter && parameters
            ? parameters
                .filter((p) => p.id === Number.parseInt(cohort.selectedParameter as string))
                .reduce((_, found) => found.name_ru, '-')
            : '-'
      },
      laboratory: {
        id: 'laboratory',
        label: 'Лаборатория',
        data:
          cohort.selectedLab && labs
            ? labs.filter((l) => l.id === (cohort.selectedLab as unknown as number))[0].name_ru
            : '-'
      },
      regions: {
        id: 'regions',
        label: cohort.selectedRegion && cohort.selectedRegion.length > 1 ? 'Регионы' : 'Регион',
        data:
          cohort.selectedRegion && cohort.selectedRegion.length !== 0
            ? cohort.selectedRegion.map((region) => <Chip label={region.name_ru ?? '-'} size="small" />)
            : '-'
      },
      humanSex: {
        id: 'humanSex',
        label: 'Пол',
        data: cohort.humanSex ? sexMapping[cohort.humanSex as keyof SexMapping] : '-'
      },
      date: {
        id: 'date',
        label: 'Дата',
        data: getFormattedDate(cohort.date)
      },
      permission: {
        id: 'permission',
        label: 'Разрешение',
        data: cohort.permission ?? '-'
      },
      'age-from': {
        id: 'age-from',
        label: 'Возраст',
        data: (
          <AgeContainer>
            <Typography variant="body1" component="div">
              от
            </Typography>
            <Typography variant="body2">{cohort?.ageRange[0] ?? '-'}</Typography>
            <Typography variant="body1" component="div">
              до
            </Typography>
            <Typography variant="body2">{cohort?.ageRange[1] ?? '-'}</Typography>
          </AgeContainer>
        )
      }
    };
  }
}

export const datasetSpecificationInfoService = new DatasetSpecificationInfoService();
