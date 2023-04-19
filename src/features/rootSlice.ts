import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IMatch {
  firstCommand: string;
//   secondCommand: string;
//   isRunning: boolean;
//   isPaused: boolean;
//   period: number;
//   seconds: number;
//   minutes: number;
//   firstCommandScore: number;
//   secondCommandScore: number;
}

const initialState: IMatch = {
  firstCommand: 'Команда 1',
//   secondCommand: 'Команда 2',
//   isRunning: false,
//   isPaused: false,
//   period: 1,
//   seconds: 0,
//   minutes: 12,
//   firstCommandScore: 0,
//   secondCommandScore: 0,
};

const rootSlice = createSlice({
  name: 'Match',
  initialState,
  reducers: {
    setFirstName(state, action: PayloadAction<string>) {
      state.firstCommand = action.payload;
    },
  }
});

export const {

} = rootSlice.actions;
export default rootSlice.reducer;
