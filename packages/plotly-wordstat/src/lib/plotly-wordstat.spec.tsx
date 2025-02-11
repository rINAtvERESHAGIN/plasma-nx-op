import { render } from '@testing-library/react';

import PlotlyWordstat from './plotly-wordstat';

describe('PlotlyWordstat', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PlotlyWordstat />);
    expect(baseElement).toBeTruthy();
  });
});
