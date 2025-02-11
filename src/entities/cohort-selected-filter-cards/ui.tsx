import React from 'react';
import {
  Container,
  ContainerHeader,
  CardContainer,
  CardHeader,
  InfoContainer,
  ScrollContainer,
  BlurOverlay,
  DeleteButton
} from './ui.styled';
import { Label } from '@plasma/ui';
import type { CohortSelectedFilterCardsProps } from './type';
import { getGenderIcon } from './utils';
import { BORDER_COLORS } from './constants';
import { X } from '@mui/icons-material';
import { FirstAid } from '../../shared/draft-icons/first-aid/FirstAid';
import { MapPin } from '../../shared/draft-icons/map-pin/MapPin';
import { Syringe } from '../../shared/draft-icons/syringe/Syringe';

export const CohortSelectedFilterCards: React.FunctionComponent<CohortSelectedFilterCardsProps> = ({
  filterSelections,
  onDelete
}) => {
  const handleOnClickDelete = (index: number) => () => onDelete(index);

  return (
    <Container>
      <ContainerHeader>Созданные наборы данных</ContainerHeader>
      <ScrollContainer>
        {filterSelections.map((selection, index) => (
          <CardContainer
            key={index}
            style={{
              borderColor: BORDER_COLORS[index % BORDER_COLORS.length]
            }}
          >
            <CardHeader>
              Когорта №{index + 1}
              <DeleteButton onClick={handleOnClickDelete(index)}>
                <X />
              </DeleteButton>
            </CardHeader>
            <InfoContainer>
              <Label label={selection.region} icon={<MapPin />} />
              <Label label={selection.lab} icon={<FirstAid />} />
              <Label label={` от ${selection.minAge} до ${selection.maxAge}`} icon={getGenderIcon(selection.gender)} />
              <Label label={selection.parameter} icon={<Syringe />} />
            </InfoContainer>
          </CardContainer>
        ))}
      </ScrollContainer>
      <BlurOverlay />
    </Container>
  );
};
