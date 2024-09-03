import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./features/counter";
import UserReducer from "./features/user";
import BlogReducer from "./features/blogs";
export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    user: UserReducer,
    blog : BlogReducer
  
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
