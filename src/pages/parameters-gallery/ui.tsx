import { useParametersCore } from '@org/store-redux';

import React, { useEffect, useState, useCallback } from 'react';
import { Grid } from '@mui/material';
import { type Parameter } from 'types';
import { useNavigate } from 'react-router-dom';
import { CategoryHeader, Container, StyledLink } from './ui.styled';
import ParameterCard from '../../entities/parameter-card/ui';

type GroupedParameters = Record<string, Parameter[]>;

export const ParametersGallery: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const parameters = useParametersCore();
  const [groupedByCategory, setGroupedByCategory] = useState<GroupedParameters>({});

  const handleOnClick = (parameterId: number): void => {
    if (parameterId !== undefined) {
      navigate(`/parameterInfo/${parameterId}`);
    }
  };

  // Функция для группировки и сортировки параметров
  const groupAndSortParameters = useCallback((params: Parameter[]): GroupedParameters => {
    const grouped = params.reduce((acc: GroupedParameters, parameter) => {
      if (acc[parameter.category] === undefined) {
        acc[parameter.category] = [];
      }
      acc[parameter.category].push(parameter);
      return acc;
    }, {});

    Object.keys(grouped).forEach((category) => {
      grouped[category].sort((a, b) => a.id - b.id);
    });

    return grouped;
  }, []);

  useEffect(() => {
    if (parameters.data !== undefined) {
      const groupedData = groupAndSortParameters(parameters.data);
      setGroupedByCategory(groupedData);
    }
  }, [parameters, groupAndSortParameters]);

  return (
    <Container container spacing={2}>
      {Object.entries(groupedByCategory).map(([category, parameters]) => (
        <Grid item xs={12} key={category}>
          <CategoryHeader variant="h4">{category}:</CategoryHeader>
          <Grid container spacing={2}>
            {parameters.map((parameter) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={parameter.id}>
                <StyledLink to={`/parameterInfo/${parameter.id}`}>
                  <ParameterCard
                    item={parameter}
                    onClick={() => {
                      handleOnClick(parameter.id);
                    }}
                  />
                </StyledLink>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Container>
  );
};
