import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction
} from '@reduxjs/toolkit';

export const BLOCKNOTES_FEATURE_KEY = 'blocknotes';

/*
 * Update these interfaces according to your requirements.
 */
export interface BlocknotesEntity {
  id: number;
}

export interface BlocknotesState extends EntityState<BlocknotesEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}

export const blocknotesAdapter = createEntityAdapter<BlocknotesEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchBlocknotes())
 * }, [dispatch]);
 * ```
 */
export const fetchBlocknotes = createAsyncThunk<BlocknotesEntity[]>('blocknotes/fetchStatus', async (_, thunkAPI) => {
  /**
   * Replace this with your custom fetch call.
   * For example, `return myApi.getBlocknotess()`;
   * Right now we just return an empty array.
   */
  return Promise.resolve([]);
});

export const initialBlocknotesState: BlocknotesState = blocknotesAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null
});

export const blocknotesSlice = createSlice({
  name: BLOCKNOTES_FEATURE_KEY,
  initialState: initialBlocknotesState,
  reducers: {
    add: blocknotesAdapter.addOne,
    remove: blocknotesAdapter.removeOne
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlocknotes.pending, (state: BlocknotesState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchBlocknotes.fulfilled, (state: BlocknotesState, action: PayloadAction<BlocknotesEntity[]>) => {
        blocknotesAdapter.setAll(state, action.payload);
        state.loadingStatus = 'loaded';
      })
      .addCase(fetchBlocknotes.rejected, (state: BlocknotesState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  }
});

/*
 * Export reducer for store configuration.
 */
export const blocknotesReducer = blocknotesSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(blocknotesActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const blocknotesActions = blocknotesSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllBlocknotes);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = blocknotesAdapter.getSelectors();

export const getBlocknotesState = (rootState: { [BLOCKNOTES_FEATURE_KEY]: BlocknotesState }): BlocknotesState =>
  rootState[BLOCKNOTES_FEATURE_KEY];

export const selectAllBlocknotes = createSelector(getBlocknotesState, selectAll);

export const selectBlocknotesEntities = createSelector(getBlocknotesState, selectEntities);
