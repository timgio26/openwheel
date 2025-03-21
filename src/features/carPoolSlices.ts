import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

// Define a type for the slice state
interface CounterState {
  day: number|undefined;
  curLat:number|undefined;
  curLng:number|undefined;
}

// Define the initial state using that type
const initialState: CounterState = {
  day: undefined,
  curLat:undefined,
  curLng:undefined,
}

export const daySlice = createSlice({
  name: 'selectedDaySlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setday: (state, action: PayloadAction<number>) => {
      state.day = action.payload
    },
    setCurLat: (state, action: PayloadAction<number>) => {
      state.curLat = action.payload
    },
    setCurLng: (state, action: PayloadAction<number>) => {
      state.curLng = action.payload
    },

    // decrement: state => {
    //   state.value -= 1
    // },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }
  }
})

export const { setday,setCurLat,setCurLng} = daySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const getSelectedDay = (state: RootState) => state.day.day

export default daySlice.reducer