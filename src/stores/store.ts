import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';

// Инициализация хранилища
const store = configureStore({
  reducer: rootReducer,
});

export default store;