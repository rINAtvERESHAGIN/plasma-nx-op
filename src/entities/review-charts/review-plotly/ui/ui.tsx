import React from 'react';
import { ReviewPlotlyCardContent, StyledCard } from './ui.styled';
import Plot from 'react-plotly.js';
import { useAppSelector } from '@org/store-redux';

const ReviewPlotly = (props): React.ReactNode => {
  const ageSexPyramidCoverage = useAppSelector((state) => state.reviewChart.ageSexPyramidCoverage);

  return (
    <StyledCard style={props.style}>
      <ReviewPlotlyCardContent>
        {ageSexPyramidCoverage?.data && ageSexPyramidCoverage.layout ? (
          <Plot
            data={JSON.parse(JSON.stringify(ageSexPyramidCoverage.data))}
            layout={JSON.parse(
              JSON.stringify({
                ...ageSexPyramidCoverage.layout,
                responsive: true,
                useResizeHandler: true,
                autosize: true,
                width: '100%'
              })
            )}
            config={{
              displayModeBar: false
            }}
          />
        ) : null}
      </ReviewPlotlyCardContent>
    </StyledCard>
  );
};
export default ReviewPlotly;
