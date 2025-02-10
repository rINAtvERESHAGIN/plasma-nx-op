import { render } from '@testing-library/react';

import CustomBlock from './custom-block';

describe('CustomBlock', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomBlock />);
    expect(baseElement).toBeTruthy();
  });
});
