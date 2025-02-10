import { render } from '@testing-library/react';

import DatasetSpecificationForm from './dataset-specification-form';

describe('DatasetSpecificationForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DatasetSpecificationForm />);
    expect(baseElement).toBeTruthy();
  });
});
