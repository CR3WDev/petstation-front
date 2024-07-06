import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMode } from 'types/mode'

const initialState: IMode = 'search'

const modeSlice = createSlice({
  name: 'modeSlice',
  initialState,
  reducers: {
    setMode: (_, { payload }: PayloadAction<any | IMode>) => {
      return payload
    },
  },
})

export default modeSlice.reducer
export const { setMode } = modeSlice.actions
export const selectorMode = (state: any) => {
  return state.modeSlice as IMode
}
