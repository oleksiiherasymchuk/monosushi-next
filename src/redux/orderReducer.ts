import { ProductType } from "@/shared/types/products/product"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: ProductType[] = []

// export const getAlbumsThunkRTK = createAsyncThunk("api/albums", async () => {
//   try {
//     const response = await PostsRTKService.getAlbums();
//     return response.data;
//   } catch (e) {
//     console.log(e);
//   }
// });

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<ProductType>) => {
      state.push(action.payload)
    },
    deleteFromBasket: (state, action: PayloadAction<{ id: number | string }>) => {
      return state.filter((prod) => prod.id !== action.payload.id)
    }
  },
  // extraReducers: {
  //   [getPostsThunkRTK.fulfilled.type]: (state, action) => {
  //     state.posts = action.payload
  //   },
  //   [getPostsThunkRTK.rejected.type]: (state, action) => {
  //     console.log(action);
  //   },
  //   [getAlbumsThunkRTK.fulfilled.type]: (state, action) => {
  //     state.albums = action.payload
  //   },
  //   [getAlbumsThunkRTK.rejected.type]: (state, action) => {
  //     console.log(action);
  //   },
  //   [getCommentsThunkRTK.fulfilled.type]: (state, action) => {
  //     state.comments = action.payload
  //   },
  //   [getCommentsThunkRTK.rejected.type]: (state, action) => {
  //     console.log(action);
  //   },
  // },
})

export const orderReducer = orderSlice.reducer
export const orderActions = orderSlice.actions