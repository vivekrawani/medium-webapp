import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types";
import { loadLocalStorage, setLocalStorage } from "../utils";
export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: loadLocalStorage("medium-string"),
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      console.log("userslcie", action.payload);
      state.user = action.payload;
      setLocalStorage("medium-user", JSON.stringify(action.payload));
    },
  },
});
export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
