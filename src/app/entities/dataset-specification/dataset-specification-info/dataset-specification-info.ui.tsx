import Info from '@shared/ui/info/ui';
import React, { useEffect, useState } from 'react';
import { type DatasetSpecification } from '@shared/api/model/Comparison';
import { useLabsCore, useParametersCore, useRegionsCore } from '@app/core-data-slice/reducer';
import { ContentContainer } from './dataset-specification-info.styled';
import { type InfoId, type DatasetSpecificationInfoType } from './dataset-specification-info.types';
import { isNil } from 'lodash';
import { datasetSpecificationInfoService } from './dataset-specification-info.service';

interface IProps {
    cohort?: DatasetSpecification;
    onClickItem?: () => void;
}

export const DatasetSpecificationInfo: React.FunctionComponent<IProps> = ({ cohort, onClickItem }) => {
  const labs = useLabsCore().data;
  const parameters = useParametersCore().data;
  const regions = useRegionsCore().data;

  const [info, setInfo] = useState<DatasetSpecificationInfoType | undefined>(undefined);

  useEffect(() => {
    if (!isNil(cohort) && !isNil(regions) && !isNil(parameters) && !isNil(labs)) {
      setInfo(datasetSpecificationInfoService.formatDatasetSpecificationInfo(cohort, labs, parameters, regions));
    }
  }, [cohort, labs, regions, parameters]);

  if (cohort != null) {
    return (
      <ContentContainer>
        {info !== undefined
          ? Object.keys(info).map((infoKey) => {
            const inf = info[infoKey as InfoId];
            return (
              <Info
                key={inf.id}
                onClick={onClickItem}
                info={{
                  id: inf.id,
                  label: inf.label,
                  data: inf.data
                }}
              />
            );
          })
          : null}
      </ContentContainer>
    );
  }

  return <>Dataset Specification Info</>;
};
