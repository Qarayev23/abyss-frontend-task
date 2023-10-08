import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import categoryReducer from './features/categorySlice'
import zoomSlice from './features/zoomSlice'


export const store = configureStore({
  reducer: {
    categoryReducer,
    zoomSlice,
  }
})

setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;