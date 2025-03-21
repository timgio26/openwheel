import { configureStore } from '@reduxjs/toolkit'
import dayReducers from './src/features/carPoolSlices'
import routeReducers from './src/features/myRouteSlices'

export const store = configureStore({
  reducer: {
    day: dayReducers,
    route:routeReducers
    // comments: commentsReducer,
    // users: usersReducer
  }
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']