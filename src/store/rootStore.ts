import { configureStore } from "@reduxjs/toolkit";
import accessReducer from '../store/accessStore'
import todoreducer from '../store/todoStore'
export const store = configureStore({
    reducer: {
      access: accessReducer,
      todo:todoreducer
    }
  })
export type DispatchType = typeof store.dispatch;