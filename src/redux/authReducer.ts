
import { authService } from "@/services/authService";
import { UserType } from "@/shared/types/user/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { create } from "domain";
import { User, UserCredential } from "firebase/auth";
import { DocumentData } from "firebase/firestore";

interface IAuthState {
  isAuthenticated: boolean;
  user: DocumentData | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
};

export const signInThunk = createAsyncThunk<
  UserCredential | null,
  { email: string; password: string }
>("auth/signIn", async ({ email, password }) => {
  try {
    const response = await authService.signIn(email, password);
    return response;
  } catch (error) {
    console.error("Error signing in:", error);
    return null;
  }
});

export const getUserDataThunk = createAsyncThunk<
  DocumentData | null,
  { userId: string }
>("auth/getUserData", async ({ userId }) => {
  try {
    const response = await authService.getUserData(userId);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
});

export const updateUserThunk = createAsyncThunk<User | null | DocumentData, User>(
  "auth/updateUser",
  async (user) => {
    try {
      const updatedUser = await authService.updateUser(user);
      return updatedUser;
    } catch (error) {
      console.log(error)
      return null
    }
  }
);

export const createUserThunk = createAsyncThunk<User | null, UserType>(
  "auth/createUser",
  async (user: any) => {
    try {
      const createdUser = await authService.createUser(user)
      return createdUser
    } catch (error) {
      console.log(error)
      return null
    }
  }
)

export const logOutThunk = createAsyncThunk<void>(
  "auth/logout",
  async () => {
    try{
      await authService.logOut()
    } catch (error) {
      console.log(error)
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // authenticateUser(state, action: PayloadAction<boolean>) {
    //   state.isAuthenticated = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
      }
    })
    .addCase(getUserDataThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(updateUserThunk.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(logOutThunk.fulfilled, (state) => {
      state.user = null
      state.isAuthenticated = false
    })

    .addCase(createUserThunk.fulfilled, (state, action) => {
      if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload;
      }
    })
    .addCase(createUserThunk.rejected, (state) => {
        state.isAuthenticated = false;
    })
  },
});

export const authReducer = authSlice.reducer;
// export const authActions = authSlice.actions;
export const authActions = { ...authSlice.actions, getUserDataThunk, signInThunk, updateUserThunk, logOutThunk, createUserThunk };
