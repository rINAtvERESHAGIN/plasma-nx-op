import { render } from '@testing-library/react';

import Blocknote from './blocknote';

describe('Blocknote', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Blocknote />);
    expect(baseElement).toBeTruthy();
  });
});
