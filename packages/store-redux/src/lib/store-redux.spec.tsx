import { render } from '@testing-library/react';

import StoreRedux from './store-redux';

describe('StoreRedux', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StoreRedux />);
    expect(baseElement).toBeTruthy();
  });
});
