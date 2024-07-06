import { configureStore } from '@reduxjs/toolkit';
import modeSlice from './Reducers/modeReducer';
export const store = configureStore({
	reducer: {
		modeSlice,
	},
});
