import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WordStatAutocomplete from '../components/wordstat-autocomplete';
import WordStatFrequency from '../components/wordstat-frequency';
import WordStatDatePickers from '../components/wordstat-date-pickers';

interface WordStatParametersAccordionProps {
  data: string[];
  selectedPhrase: string | null;
  setSelectedPhrase: (value: string | null) => void;
  frequency: string;
  setFrequency: (value: string) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
}

const WordStatParametersAccordion: React.FC<WordStatParametersAccordionProps> = ({
  data,
  selectedPhrase,
  setSelectedPhrase,
  frequency,
  setFrequency,
  startDate,
  setStartDate,
  endDate,
  setEndDate
}) => {
  return (
    <Accordion sx={{ width: '100%' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Поисковые запросы</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <WordStatAutocomplete data={data} selectedPhrase={selectedPhrase} setSelectedPhrase={setSelectedPhrase} />
          <WordStatDatePickers
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          <WordStatFrequency frequency={frequency} setFrequency={setFrequency} />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default WordStatParametersAccordion;
