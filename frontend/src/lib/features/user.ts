import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types";
import { loadLocalStorage, setLocalStorage } from "../utils";
export interface UserState {
  user: User | null;
}

const user = loadLocalStorage("medium-user");

const initialState: UserState = {
  user:
    user === undefined
      ? null
      : {
          name: user?.name,
          avatarURL: user?.avatarURL,
          id: user?.id,
          username: user?.username,
          email: user?.email,
        },
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
