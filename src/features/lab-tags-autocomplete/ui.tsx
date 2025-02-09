import React, { useEffect, useState } from 'react';
import { LabAutocomplete } from '@features/lab-autocomplete/ui';
import { Container } from './ui.styled';
import { Tag } from '@shared/ui/story-tag/ui.tsx';
import type { LabAutocompleteWithTagsProps } from './types';
import { labTags } from './constants';

export const LabAutocompleteWithTags: React.FunctionComponent<LabAutocompleteWithTagsProps> = ({
  value,
  onLabChange,
}) => {
  const [selectedLabs, setSelectedLabs] = useState<number[]>([]);

  const handleTagClick = (labId: number): void => {
    setSelectedLabs((prevSelectedLabs) =>
      prevSelectedLabs.includes(labId) ? prevSelectedLabs.filter((id) => id !== labId) : [...prevSelectedLabs, labId],
    );
  };

  useEffect(() => {
    onLabChange(selectedLabs);
  }, [selectedLabs, onLabChange]);

  useEffect(() => {
    if (value !== selectedLabs) {
      setSelectedLabs(value);
    }
  }, [value]);

  return (
    <Container>
      <LabAutocomplete value={selectedLabs} onLabChange={setSelectedLabs} />
      <div>
        {labTags.map((tag) => (
          <Tag
            key={tag.value}
            label={tag.label}
            onClick={() => {
              handleTagClick(tag.value);
            }}
            color={selectedLabs.includes(tag.value) ? 'primary' : 'secondary'}
            clickable
          />
        ))}
      </div>
    </Container>
  );
};
