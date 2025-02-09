import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type LabNameRU =
    | 'CMD'
    | 'Литех Центр'
    | 'Литех Юг'
    | 'Сиблаб'
    | 'ОКДЦ'
    | 'ЧУЗ РЖД Медицина'
    | 'МБУЗ КДЦ «Здоровье»'
    | 'Инвитро'
    | 'Обзор'

export interface ILabs {
  id: number
  name_ru: LabNameRU
}

interface LabsState {
  data?: ILabs[]
}

const initialState: LabsState = {
  data: undefined
};

const labsSlice = createSlice({
  name: 'labs',
  initialState,
  reducers: {
    setLabs: (state, action: PayloadAction<ILabs[]>) => {
      state.data = action.payload;
    },
    addLab: (state, action: PayloadAction<ILabs>) => {
      state.data.push(action.payload);
    },
    removeLab: (state, action: PayloadAction<number>) => {
      const labId = action.payload;
      state.data = state.data.filter((lab) => lab.id !== labId);
    },
    updateLab: (state, action: PayloadAction<ILabs>) => {
      const updatedLab = action.payload;
      const labIndex = state.data.findIndex((lab) => lab.id === updatedLab.id);
      if (labIndex !== -1) {
        state.data[labIndex] = updatedLab;
      }
    }
  }
});

export const {
  setLabs, addLab, removeLab, updateLab
} = labsSlice.actions;

export const labsReducer = labsSlice.reducer;
