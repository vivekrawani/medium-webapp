import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./features/counter";
import UserReducer from "./features/user";
export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    user: UserReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
