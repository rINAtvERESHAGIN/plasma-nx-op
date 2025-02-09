import { useLabsCore } from '@app/core-data-slice/reducer';
import { getSelectViewLabs } from '@features/trace-form/lib/getSelectViewParameters';
import { Select, type SelectData } from 'mui-rff';
import { useEffect, useState } from 'react';
import * as React from 'react';

const LabDatasetSpecification = (): React.ReactNode => {
  const [selectViewLabs, setSelectViewLabs] = useState<SelectData[] | undefined>(undefined);
  const labs = useLabsCore().data;

  useEffect(() => {
    if (labs != null) {
      setSelectViewLabs(() => labs.map((lab) => getSelectViewLabs(lab)));
    }
  }, [labs]);
  if (selectViewLabs != null)
    return <Select name="selectedLab" label="Лаборатории" variant="standard" data={selectViewLabs} size="small" />;

  return null;
};

export default LabDatasetSpecification;
