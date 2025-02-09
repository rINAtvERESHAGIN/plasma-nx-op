import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useProcessorsCore } from '@app/core-data-slice/reducer';
import ProcessorParamsForm from '@features/processor-params-form/ui';
import { FieldsContainer, ProcessorContainer } from './ui.styled';

const ProcessorsGallery: React.FunctionComponent = () => {
  const processors = useProcessorsCore();

  useEffect(() => {
    if (processors?.data !== undefined) {
    }
  }, [processors]);

  return (
    <>
      {processors?.data &&
        Object.entries(processors.data).map(([key, processor]) => (
          <ProcessorContainer key={key}>
            <Typography variant="h5">{processor.class_name}</Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              description: {processor.description}
            </Typography>
            <FieldsContainer>
              <ProcessorParamsForm item={processor} />
            </FieldsContainer>
          </ProcessorContainer>
        ))}
    </>
  );
};

export default ProcessorsGallery;
