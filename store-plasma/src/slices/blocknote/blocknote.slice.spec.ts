import {
  fetchBlocknotes,
  blocknotesAdapter,
  blocknotesReducer,
} from '../blocknote.slice';

describe('blocknotes reducer', () => {
  it('should handle initial state', () => {
    const expected = blocknotesAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(blocknotesReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchBlocknotes', () => {
    let state = blocknotesReducer(undefined, fetchBlocknotes.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
        ids: [],
      })
    );

    state = blocknotesReducer(
      state,
      fetchBlocknotes.fulfilled([{ id: 1 }], '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );

    state = blocknotesReducer(
      state,
      fetchBlocknotes.rejected(new Error('Uh oh'), '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );
  });
});
