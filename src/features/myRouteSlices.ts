import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../../store'

// Define a type for the slice state
interface CounterState {
  curLat:number|undefined;
  curLng:number|undefined;
}

// Define the initial state using that type
const initialState: CounterState = {
  curLat:undefined,
  curLng:undefined,
}

export const routeSlice = createSlice({
  name: 'myRouteSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCurLat: (state, action: PayloadAction<number>) => {
      state.curLat = action.payload
    },
    setCurLng: (state, action: PayloadAction<number>) => {
      state.curLng = action.payload
    },
  }
})

export const { setCurLat,setCurLng} = routeSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const getMyRoute = (state: RootState) => (state.route.curLat)

export default routeSlice.reducer