import { auth } from "@/firebase/config";
import { authService } from "@/services/authService";
import { UserType } from "@/shared/types/user/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserCredential } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { toast } from "react-toastify";

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

export const updateUserThunk = createAsyncThunk<
  User | null | DocumentData,
  User
>("auth/updateUser", async (user) => {
  try {
    const updatedUser = await authService.updateUser(user);
    return updatedUser;
  } catch (error) {
    console.log(error);
    return null;
  }
});

export const createUserThunk = createAsyncThunk<User | null, UserType>(
  "auth/createUser",
  async (user: any) => {
    try {
      const createdUser = await authService.createUser(user);
      return createdUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

export const logOutThunk = createAsyncThunk<void>("auth/logout", async () => {
  try {
    await authService.logOut();
  } catch (error) {
    console.log(error);
  }
});

export const addAddressThunk = createAsyncThunk<
  DocumentData | null,
  { userId: string; newAddress: any }
>("auth/addAddress", async ({ userId, newAddress }) => {
  try {
    await authService.addAddress(userId, newAddress);
    const updatedUserData = await authService.getUserData(userId);
    return updatedUserData;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
});

export const editAddressThunk = createAsyncThunk(
  "auth/editAddress",
  async ({ data }: { data: any }) => {
    try {
      const editedAddress = await authService.editAddress(data);
      return editedAddress;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAddressThunk = createAsyncThunk<void, string>(
  "auth/deleteAddress",
  async (addressId) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await authService.deleteAddress(currentUser.uid, addressId);
        return;
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
        }
      })
      .addCase(getUserDataThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logOutThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
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

      .addCase(editAddressThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const updatedAddressIndex = state.user?.addresses.findIndex(
            (address: any) => address.id === action.payload.id
          );
          if (updatedAddressIndex !== undefined && updatedAddressIndex !== -1) {
            state.user!.addresses[updatedAddressIndex] = {
              ...state.user!.addresses[updatedAddressIndex],
              ...action.payload,
            };
            state.user = { ...state.user };
            toast.success("Aдресу успішно змінено!");
          } else {
            toast.error(
              "Помилка у спробі змінити адресу. Спробуйте пізніше!"
            );
          }
        } else {
          toast.error("Помилка редагування адреси. Спробуйте пізніше!");
        }
      })

      .addCase(deleteAddressThunk.fulfilled, (state, action) => {
        if (state.user) {
          state.user.addresses = state.user.addresses.filter(
            (a: any) => a.id !== action.payload
          );
        }
      })

      .addCase(addAddressThunk.fulfilled, (state, action) => {
        if (state.user) {
          state.user = action.payload;
        }
      });
  },
});

export const authReducer = authSlice.reducer;
export const authActions = {
  ...authSlice.actions,
  getUserDataThunk,
  signInThunk,
  updateUserThunk,
  logOutThunk,
  createUserThunk,

  addAddressThunk,
  deleteAddressThunk,
  editAddressThunk,
};
