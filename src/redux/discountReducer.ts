import { firebaseService } from "@/services/firebaseService";
import { DiscountType } from "@/shared/types/discount/discount";
import { Draft, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface IDiscount {
  loading: boolean;
  discounts: Draft<DiscountType>[];
  currentDiscount: DiscountType | null;
}

const initialState: IDiscount = {
  loading: true,
  discounts: [],
  currentDiscount: null,
};

export const setLoading = (loading: boolean) => ({
  type: "discounts/setLoading",
  payload: loading,
});

export const getDiscountsFromFirebaseThunk = createAsyncThunk(
  "discounts/getDiscounts",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const discounts = await firebaseService.getDiscounts();
      return discounts;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const getDiscountByName = createAsyncThunk(
  "discount/currentDiscount",
  async (name: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const currentDiscount = await firebaseService.getCurrentDiscount(name);
      return currentDiscount;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const discountSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDiscountsFromFirebaseThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.discounts = action.payload;
        }
      })
      .addCase(getDiscountsFromFirebaseThunk.rejected, (state, action) => {
        console.error(action.error);
      })
      .addCase(getDiscountByName.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentDiscount = action.payload;
        }
      });
  },
});

export const discountReducer = discountSlice.reducer;
export const discountActions = {
  ...discountSlice.actions,
  getDiscountsFromFirebaseThunk,
  getDiscountByName,
};
