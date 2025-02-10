import React from 'react';
import { Card, CardContent, type CardProps, Typography, CardActionArea, type CardActionAreaProps } from '@mui/material';
import { type Parameter } from 'types';

interface IProps<DataType> extends CardProps {
  item: Parameter;
  onClick?: CardActionAreaProps['onClick'];
}

function ParameterCard<DataType>({ item, onClick }: IProps<DataType>): React.ReactNode {
  const handleOnClick = React.useCallback(
    (_): void => {
      if (onClick != null) {
        onClick(_);
      }
    },
    [onClick]
  );

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography variant="h5">{item.name_ru}</Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            id: {item.id}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            name_en: {item.name_en}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            category: {item.category}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            function: {item.function}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            description_ru: {item.description_ru}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            description_en: {item.description_en}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ParameterCard;
