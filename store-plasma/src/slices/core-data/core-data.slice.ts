import { type PayloadAction, type ThunkAction, createSlice, type AnyAction } from '@reduxjs/toolkit';
import { RootState, useAppSelector } from '../../lib/store-plasma';
import { AllRegion, Lab, Parameter } from 'types';


interface InitialState {
  _labs: {
    data?: Lab[];
  };
  _regions: {
    data?: AllRegion;
  };
  _parameters: {
    data?: Parameter[];
  };
  _timeline: {
    data?: Timeline[];
  };
  _processors: {
    data?: any;
  };
}

const initialState: InitialState = {
  _labs: {
    data: undefined
  },
  _regions: {
    data: undefined
  },
  _parameters: {
    data: undefined
  },

  _timeline: {
    data: undefined
  },

  _processors: {
    data: undefined
  }
};

const coreDataSlice = createSlice({
  name: 'core-data',
  initialState,
  reducers: {
    setData: (
      state,
      {
        payload: { data, key }
      }: PayloadAction<{ key: keyof InitialState; data: Array<Lab | Parameter | Timeline> | AllRegion }>
    ) => {
      if (Array.isArray(data)) return { ...state, [key]: { data: [...data] } };
      if (typeof data === 'object') return { ...state, [key]: { data: { ...data } } };
      return { ...state };
    }
  }
});

export const { setData } = coreDataSlice.actions;

export class CoreDataActionCreatorService {
  static setLabs(data: Lab[]): ThunkAction<void, RootState, unknown, AnyAction> {
    return (dispatch) => {
      dispatch(setData({ key: '_labs', data }));
    };
  }

  static setParameters(data: Parameter[]): ThunkAction<void, RootState, unknown, AnyAction> {
    return (dispatch) => {
      dispatch(setData({ key: '_parameters', data }));
    };
  }

  static setRegions(data: AllRegion): ThunkAction<void, RootState, unknown, AnyAction> {
    return (dispatch) => {
      dispatch(setData({ key: '_regions', data }));
    };
  }

  static setTimeline(data: Timeline[]): ThunkAction<void, RootState, unknown, AnyAction> {
    return (dispatch) => {
      dispatch(setData({ key: '_timeline', data }));
    };
  }

  static setProcessors(data: any): ThunkAction<void, RootState, unknown, AnyAction> {
    return (dispatch) => {
      dispatch(setData({ key: '_processors', data }));
    };
  }
}

// labs
type UseLabs = () => InitialState['_labs'];
export const useLabsCore: UseLabs = () => {
  const labs = useAppSelector((state) => state.coreData._labs);
  return labs;
};
// parameters
type UseParameters = () => InitialState['_parameters'];
export const useParametersCore: UseParameters = () => {
  const parameters = useAppSelector((state) => state.coreData._parameters);
  return parameters;
};
// regions
type UseRegions = () => InitialState['_regions'];
export const useRegionsCore: UseRegions = () => {
  const regions = useAppSelector((state) => state.coreData._regions);
  return regions;
};
// timeline
type UseTimeline = () => InitialState['_timeline'];
export const useTimelineCore: UseTimeline = () => {
  const timeline = useAppSelector((state) => state.coreData._timeline);
  return timeline;
};
// processors
type UseProcessors = () => InitialState['_processors'];
export const useProcessorsCore: UseProcessors = () => {
  const processors = useAppSelector((state) => state.coreData._processors);
  return processors;
};

export const coreDataReducer = coreDataSlice.reducer;
