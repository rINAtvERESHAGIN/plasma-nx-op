import React from 'react';
import Typography from '@mui/material/Typography';

interface IProps {
  title: string
}

function DatasetSpecificationFormHeader ({ title }: IProps): React.ReactNode {
  return (
    <Typography
      gutterBottom
      variant="h5"
      component="div"
      sx={{
        position: 'absolute',
        paddingTop: '16px',
        top: '0',
        left: '16',
        width: '100%',
        height: 'auto',
        zIndex: 500,
        backgroundColor: '#fff'
      }}
    >
      {title}
    </Typography>
  );
}

export default DatasetSpecificationFormHeader;
