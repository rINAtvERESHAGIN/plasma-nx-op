import { useProcessorsCore } from '@org/store-redux';
import ProcessorParamsForm from '../../processor-params-form/ui';
import { getSelectViewProcessors } from '../../trace-form/lib/getSelectViewParameters';
import { Select, type SelectData } from 'mui-rff';
import { useEffect, useState } from 'react';
import * as React from 'react';

const ProcessorDatasetSpecification = (): React.ReactNode => {
    const [selectViewProcessors, setSelectViewProcessors] = useState<SelectData[] | undefined>(undefined);
    const [selectedProcessorName, setSelectedProcessorName] = useState<string | null>(null);

    const processors = useProcessorsCore().data;

    const handleChange = (event) => {
        setSelectedProcessorName(event.target.value);
    };

    useEffect(() => {
        if (processors != null) {
            const processorsArray = Object.values(processors);
            setSelectViewProcessors(() => processorsArray.map((processor) => getSelectViewProcessors(processor)));
        }
    }, [processors]);

    const selectedProcessor = processors[selectedProcessorName ?? ''];

    if (selectViewProcessors != null)
        return (
            <>
                <Select
                    name='selectedProcessor'
                    label='Processors'
                    onChange={handleChange}
                    data={selectViewProcessors}
                    value={selectedProcessorName}
                    size='small'
                />

                {selectedProcessor && <ProcessorParamsForm item={selectedProcessor} />}
            </>
        );

    return null;
};

export default ProcessorDatasetSpecification;
