import { render } from '@testing-library/react';

import ProcessorSpecification from './processor-specification';

describe('ProcessorSpecification', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProcessorSpecification />);
    expect(baseElement).toBeTruthy();
  });
});
