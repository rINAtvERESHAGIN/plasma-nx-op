import {
  LinkContainer,
  LinkCard,
  StyledLink,
  ContentCard,
  LeftLink,
  CenterLink,
  RightLink,
  ReviewContainer,
  ReviewChartsContainer,
  LinkContainerEnd
} from './ui.styled';
import { Typography } from '@mui/material';
import ApexChart from './test-chart';
import ReviewBarChartData from '../../../entities/review-charts/review-bar-chart-data/ui/ui';
import ReviewLaboratoriesChartData from '../../../entities/review-charts/review-laboratories-chart-data/ui/ui';
import ReviewNumberOfDataPointsNumber from '../../../entities/review-charts/review-number-of-data-points-number/ui/ui';
import ReviewNumberOfObservationsNumber from '../../../entities/review-charts/review-number-of-observations-number/ui/ui';
import ReviewNumberOfRations from '../../../entities/review-charts/review-number-of-patients/ui/ui';

export interface Location {
  id: number;
  coords: [number, number];
  zoom: number;
  text?: string;
  component: JSX.Element;
}

export const locations: Location[] = [
  {
    id: 1,
    coords: [84.312889, 58.680855],
    zoom: 3,
    component: (
      <LinkContainer>
        <LeftLink>
          <StyledLink to="/epidemiologist-review">
            <LinkCard>
              <Typography variant="h5">Эпидемиологическая обстановка</Typography>
            </LinkCard>
          </StyledLink>
        </LeftLink>
        <CenterLink>
          <StyledLink to="/lab-page">
            <LinkCard>
              <Typography variant="h5">Лабораторные исследования</Typography>
            </LinkCard>
          </StyledLink>
        </CenterLink>
        <RightLink>
          <StyledLink to="/main">
            <LinkCard>
              <Typography variant="h5">Свободный анализ</Typography>
            </LinkCard>
          </StyledLink>
        </RightLink>
      </LinkContainer>
    )
  },
  {
    id: 2,
    coords: [84.312889, 58.680855],
    zoom: 3,
    component: (
      <ContentCard>
        <Typography variant="h5">Система цифрового мониторинга</Typography>
        <Typography variant="h5">биохимического состояния популяции</Typography>
        <Typography variant="h5">НИИ СБМ Роспотребнадзора</Typography>
      </ContentCard>
    )
  },
  { id: 3, coords: [44.312889, 56.680855], zoom: 6, component: <ApexChart /> },
  {
    id: 4,
    coords: [32.80737319114169, 55.77170810799176],
    zoom: 5,
    component: (
      <ReviewContainer>
        <ReviewNumberOfRations style={{ gridColumn: '1 / span 1', gridRow: '1' }} />
        <ReviewNumberOfObservationsNumber style={{ gridColumn: '2 / span 1', gridRow: '1' }} />
        <ReviewNumberOfDataPointsNumber style={{ gridColumn: '1 / span 2', gridRow: '2' }} />
      </ReviewContainer>
    )
  },
  {
    id: 5,
    coords: [84.312889, 58.680855],
    zoom: 3,
    component: (
      <ReviewChartsContainer>
        <ReviewLaboratoriesChartData />
        <ReviewBarChartData />
      </ReviewChartsContainer>
    )
  },
  {
    id: 6,
    coords: [84.312889, 58.680855],
    zoom: 3,
    component: (
      <LinkContainerEnd>
        <LeftLink>
          <StyledLink to="/epidemiologist-review">
            <LinkCard>
              <Typography variant="h5">Эпидемиологическая обстановка</Typography>
            </LinkCard>
          </StyledLink>
        </LeftLink>
        <CenterLink>
          <StyledLink to="/lab-page">
            <LinkCard>
              <Typography variant="h5">Лабораторные исследования</Typography>
            </LinkCard>
          </StyledLink>
        </CenterLink>
        <RightLink>
          <StyledLink to="/main">
            <LinkCard>
              <Typography variant="h5">Свободный анализ</Typography>
            </LinkCard>
          </StyledLink>
        </RightLink>
      </LinkContainerEnd>
    )
  }
];
