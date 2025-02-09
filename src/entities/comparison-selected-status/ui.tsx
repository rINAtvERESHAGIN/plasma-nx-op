import React, { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import { Chip, Typography } from '@mui/material';
import { useAppSelector } from '@app/store';
import styled from '@emotion/styled';
import Info from '@shared/ui/info/ui';
import { type DatasetSpecification } from '@shared/api/model/Comparison';
import { getFormattedDate } from './lib/helper';

interface IProps {
  trace?: DatasetSpecification;
}

// const TextContainer = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     align-items: center;
//     flex-direction: row;
//     justify-content: flex-start;
//     gap: 8px;
// `

const StyledCardContent = styled(CardContent)`
  padding: 0;
`;

type SexMapping = Record<'0' | '1' | '2', 'жен.' | 'муж.' | 'любой'>;

const sexMapping: SexMapping = {
  0: 'любой',
  1: 'жен.',
  2: 'муж.'
};

type InfoLabel = 'Параметры' | 'Лаборатория' | 'Регионы' | 'Регион' | 'Возраст' | 'Дата' | 'Разрешение' | 'Пол';
type InfoId = 'settings' | 'laboratory' | 'regions' | 'age-from' | 'date' | 'permission' | 'humanSex';

interface InfoData {
  id: InfoId;
  label: InfoLabel;
  data: React.ReactNode | string | number;
}

const AgeContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: 8px;
`;

function DatasetSpecificationInfo({ trace }: IProps): React.ReactNode {
  const labs = useAppSelector((state) => state.labs.data);
  const parameters = useAppSelector((state) => state.parameters.data);
  const regions = useAppSelector((state) => state.regions.data);

  const [info, setInfo] = useState<Record<InfoId, InfoData> | undefined>(undefined);

  useEffect(() => {
    if (trace != null && regions != null && parameters != null && labs != null) {
      setInfo({
        settings: {
          id: 'settings',
          label: 'Параметры',
          data:
            trace.selectedParameter && parameters
              ? parameters
                  .filter((p) => p.id === Number.parseInt(trace.selectedParameter as string))
                  .reduce((_, found) => found.name_ru, '-')
              : '-'
        },
        laboratory: {
          id: 'laboratory',
          label: 'Лаборатория',
          data:
            trace.selectedLab && labs
              ? labs.filter((l) => l.id === (trace.selectedLab as unknown as number))[0].name_ru
              : '-'
        },
        regions: {
          id: 'regions',
          label: trace.selectedRegion && trace.selectedRegion.length > 1 ? 'Регионы' : 'Регион',
          data:
            trace.selectedRegion && trace.selectedRegion.length !== 0
              ? trace.selectedRegion.map((region) => <Chip label={region.name_ru ?? '-'} size="small" />)
              : '-'
        },
        humanSex: {
          id: 'humanSex',
          label: 'Пол',
          data: trace.humanSex ? sexMapping[trace.humanSex as keyof SexMapping] : '-'
        },
        date: {
          id: 'date',
          label: 'Дата',
          data: getFormattedDate(trace.date)
        },
        permission: {
          id: 'permission',
          label: 'Разрешение',
          data: trace.permission ?? '-'
        },
        'age-from': {
          id: 'age-from',
          label: 'Возраст',
          data: (
            <AgeContainer>
              <Typography variant="body1" component="div">
                от
              </Typography>
              <Typography variant="body2">{trace?.ageRange[0] ?? '-'}</Typography>
              <Typography variant="body1" component="div">
                до
              </Typography>
              <Typography variant="body2">{trace?.ageRange[1] ?? '-'}</Typography>
            </AgeContainer>
          )
        }
      });
    }
  }, [trace, labs, regions, parameters]);

  return (
    <StyledCardContent>
      {info !== undefined
        ? Object.keys(info).map((infoKey) => {
            const inf = info[infoKey as InfoId];
            return (
              <Info
                info={{
                  id: inf.id,
                  label: inf.label,
                  data: inf.data
                }}
              />
            );
          })
        : null}
    </StyledCardContent>
  );
}

export default DatasetSpecificationInfo;
