import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index.ts";
import axios from "axios";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  adress?: string;
  phone: string;
  website: string;
  company?: string;
}

export type UsersState = {
  loading: boolean;
  users: User[];
  hasErrors: boolean;
};

export const initialState: UsersState = {
  loading: false,
  users: [],
  hasErrors: false,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  const data = await res.data;

  return data;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<Array<User>>) => {
        state.loading = false;
        state.users = action.payload;
      }
    );
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
      state.users = [];
    });
  },

  reducers: {},
  // reducers: {
  //   addUser: (state, action: PayloadAction<User>) => {
  //     state.push(action.payload);
  //   },
  // },
});

//export const { addUser } = userSlice.actions;
export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;
