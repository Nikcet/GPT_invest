import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAnswer {
  answer: string;
}

const initialState: IAnswer = {
  answer: '',
};

const rootSlice = createSlice({
  name: 'Match',
  initialState,
  reducers: {
    setAnswer(state, action: PayloadAction<string>) {
      state.answer = action.payload;
    },
  }
});

export const {

} = rootSlice.actions;
export default rootSlice.reducer;
