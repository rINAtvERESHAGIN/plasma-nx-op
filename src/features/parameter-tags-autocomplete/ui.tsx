import React, { useEffect, useState } from 'react';
import { Container } from './ui.styled';
import { Tag } from '@shared/ui/story-tag/ui.tsx';
import { parameterTags } from './constants';
import type { ParameterAutocompleteWithTagsProps } from './types';
import { ParameterAutocomplete } from '@features/parameter-autocomplete/ui';

export const ParameterAutocompleteWithTags: React.FunctionComponent<ParameterAutocompleteWithTagsProps> = ({
  value,
  onParameterChange
}) => {
  const [selectedParameter, setSelectedParameter] = useState<number | null>(value ?? null);

  const handleTagClick = (parameterId: number): void => {
    setSelectedParameter((prevSelected) => (prevSelected === parameterId ? null : parameterId));
  };

  useEffect(() => {
    onParameterChange(selectedParameter);
  }, [selectedParameter, onParameterChange]);

  useEffect(() => {
    if (value !== selectedParameter) setSelectedParameter(value);
  }, [value]);

  return (
    <Container>
      <ParameterAutocomplete value={selectedParameter} onParameterChange={setSelectedParameter} />
      <div>
        {parameterTags.map((tag) => (
          <Tag
            key={tag.value}
            label={tag.label}
            onClick={() => {
              handleTagClick(tag.value);
            }}
            color={selectedParameter === tag.value ? 'primary' : 'secondary'}
            clickable
          />
        ))}
      </div>
    </Container>
  );
};
