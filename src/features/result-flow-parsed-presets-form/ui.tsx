import React, { useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ParsedPresetsFormField from '@entities/result-flow-parsed-presets-form-field/ui';
import {
  AccordionContainer,
  KeyName,
  ParsedPresetsLineContainer,
  StyledAccordion,
  StyledAccordionSummary,
  StyledButton
} from './ui.styled';

const getInitialValues = (parsedPresets) => {
  if (!parsedPresets) return {};
  return Object.entries(parsedPresets).reduce((acc, [presetName, preset]) => {
    if (preset && typeof preset === 'object') {
      Object.entries(preset).forEach(([fieldName, field]) => {
        if (field && typeof field === 'object' && 'default' in field) {
          acc[fieldName] = field.default;
        }
      });
    }
    return acc;
  }, {});
};

const renderParsedPresets = (parsedPresets) => {
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    if (parsedPresets) {
      const initialValues = getInitialValues(parsedPresets);
      setInitialValues(initialValues);
    }
  }, [parsedPresets]);

  const onSubmit = async (values): void => {

  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <AccordionContainer>
            {Object.entries(parsedPresets).map(([presetName, preset]) => (
              <StyledAccordion key={presetName}>
                <StyledAccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${presetName}-content`}
                  id={`${presetName}-header`}
                >
                  <KeyName>{presetName}</KeyName>
                </StyledAccordionSummary>
                <AccordionDetails>
                  <ParsedPresetsLineContainer>
                    {preset && typeof preset === 'object' ? (
                      Object.entries(preset).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong>
                          <ParsedPresetsFormField name={key} item={value} />
                        </div>
                      ))
                    ) : (
                      <span>{String(preset)}</span>
                    )}
                  </ParsedPresetsLineContainer>
                </AccordionDetails>
              </StyledAccordion>
            ))}
          </AccordionContainer>
          <StyledButton type="submit" size="small" disabled={submitting || pristine}>
            Изменить
          </StyledButton>
        </form>
      )}
    />
  );
};

export default renderParsedPresets;
