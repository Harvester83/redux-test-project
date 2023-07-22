import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index.ts";

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
  hasErrors: boolean;
  users: User[];
};

export const initialState: UsersState = {
  loading: false,
  hasErrors: false,
  users: [],
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", () => {
  const res = fetch("https://jsonplaceholder.typicode.com/users").then((data) =>
    data.json()
  );

  return res;
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
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      //state.error = action.error.message;
    });
  },
  
  reducers: {}
  // reducers: {
  //   addUser: (state, action: PayloadAction<User>) => {
  //     state.push(action.payload);
  //   },
  // },
});

//export const { addUser } = userSlice.actions;
export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;
