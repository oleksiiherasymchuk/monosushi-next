import { firebaseService } from "@/services/firebaseService";
import { ProductType } from "@/shared/types/products/product";
import { Draft, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProduct {
  loading: boolean;
  products: Draft<ProductType>[];
  currentProduct: Draft<ProductType> | null;
}

const initialState: IProduct = {
  loading: true,
  products: [],
  currentProduct: null,
};

export const setLoading = (loading: boolean) => ({
  type: 'products/setLoading',
  payload: loading,
});

// export const getProductsFromFirebaseThunk = createAsyncThunk(
//   "products/getProducts",
//   async (_, { dispatch }) => {
//     try {
//       dispatch(setLoading(true));
//       // const products = await firebaseService.getProducts();
//       // return products;
//     } catch (error) {
//       console.log(error);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   }
// );

export const getProductByName = createAsyncThunk(
  "products/currentProduct",
  async ( name: string, { dispatch } ) => {
    try {
      dispatch(setLoading(true));
      debugger
      const currentProduct = await firebaseService.getCurrentProduct(name)
      return currentProduct
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading(false));
    }
  }
)


export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(getProductsFromFirebaseThunk.fulfilled, (state, action) => {
      //   if(action.payload){
      //     state.discounts = action.payload;
      //   }
      // })
      // .addCase(getProductsFromFirebaseThunk.rejected, (state, action) => {
      //   console.error(action.error);
      // })
      .addCase(getProductByName.fulfilled, (state, action) => {
        if(action.payload){
          state.currentProduct = action.payload
        }
      })
      .addCase(getProductByName.rejected, (state, action) => {
        console.log(action.error)
      })
  },
});

export const productReducer = productSlice.reducer;
export const productActions = {...productSlice.actions , getProductByName};
