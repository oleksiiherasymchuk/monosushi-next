import { adminService } from "@/services/adminService";
import { CategoryType } from "@/shared/types/categories/category";
import { DiscountType } from "@/shared/types/discount/discount";
import { ProductType } from "@/shared/types/products/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface IAdminDiscount {
  loading: boolean;
  discounts: DiscountType[] | null;
  categories: CategoryType[] | null;
  products: ProductType[] | null;
}

const initialState: IAdminDiscount = {
  loading: true,
  discounts: [],
  categories: [],
  products: [],
};

export const setLoading = (loading: boolean) => ({
  type: "admin/setLoading",
  payload: loading,
});

// ADMIN GET BLOCK
export const getCategoriesThunk = createAsyncThunk(
  "admin/getCategories",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const categories = await adminService.getCategories();
      return categories;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const getDiscountsThunk = createAsyncThunk(
  "admin/getDiscounts",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const discounts = await adminService.getDiscounts();
      return discounts;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const getProductsThunk = createAsyncThunk(
  "admin/getProducts",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const products = await adminService.getProducts();
      return products;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// ADMIN CREATE BLOCK
export const createCategoryThunk = createAsyncThunk(
  "admin/createCategory",
  async (data: any) => {
    try {
      const category = await adminService.createCategory(data);
      return category;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createDiscountThunk = createAsyncThunk(
  "admin/createDiscount",
  async (data: any) => {
    try {
      const discount = await adminService.createDiscount(data);
      return discount;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createProductThunk = createAsyncThunk(
  "admin/createProduct",
  async (data: any) => {
    try {
      const product = await adminService.createProduct(data);
      return product;
    } catch (error) {
      console.log(error);
    }
  }
);

// ADMIN EDIT BLOCK
export const editCategoryThunk = createAsyncThunk(
  "admin/editCategory",
  async ({ data, categoryId }: { data: any; categoryId: string }) => {
    try {
      const editedCategory = await adminService.editCategory(data, categoryId);
      return editedCategory;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editDiscountThunk = createAsyncThunk(
  "admin/editDiscount",
  async ({ data, discountID }: { data: any; discountID: string }) => {
    try {
      const editedDiscount = await adminService.editDiscount(data, discountID);
      return editedDiscount;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editProductThunk = createAsyncThunk(
  "admin/editProduct",
  async ({ data, productID }: { data: any; productID: string }) => {
    try {
      const editedProduct = await adminService.editProduct(data, productID);
      return editedProduct;
    } catch (error) {
      console.log(error);
    }
  }
);

// ADMIN GET CURRENT BLOCK
export const getCurrentCategoryToEditThunk = createAsyncThunk(
  "admin/getCurrentCategoryToEdit",
  async (categoryId: string) => {
    try {
      const getCurrentCategoryToEdit =
        await adminService.getCurrentCategoryToEdit(categoryId);
      return getCurrentCategoryToEdit;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCurrentDiscountToEditThunk = createAsyncThunk(
  "admin/getCurrentDiscountToEdit",
  async (discountId: string) => {
    try {
      const getCurrentDiscountToEdit =
        await adminService.getCurrentDiscountToEdit(discountId);
      return getCurrentDiscountToEdit;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCurrentProductToEditThunk = createAsyncThunk(
  "admin/getCurrentProductToEdit",
  async (productId: string) => {
    try {
      const getCurrentProductToEdit =
        await adminService.getCurrentProductToEdit(productId);
      return getCurrentProductToEdit;
    } catch (error) {
      console.log(error);
    }
  }
);

// ADMIN DELETE BLOCK
export const deleteCategoryThunk = createAsyncThunk(
  "admin/deleteCategory",
  async (categoryId: string) => {
    try {
      const categories = await adminService.deleteCategory(categoryId);
      return categories;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteDiscountThunk = createAsyncThunk(
  "admin/deleteDiscount",
  async (discountId: string) => {
    try {
      const discount = await adminService.deleteDiscount(discountId);
      return discount;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "admin/deleteProduct",
  async (productId: string) => {
    try {
      const product = await adminService.deleteProduct(productId);
      return product;
    } catch (error) {
      console.log(error);
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    editCategory(
      state,
      action: PayloadAction<{ categoryId: string; newData: any }>
    ) {
      const { categoryId, newData } = action.payload;
      const index = state.categories?.findIndex(
        (category: any) => category.id === categoryId
      );
      if (index !== undefined && index !== -1) {
        state.categories![index] = { ...state.categories![index], ...newData };
      }
    },

    editDiscount(
      state,
      action: PayloadAction<{ discountId: string; newData: any }>
    ) {
      const { discountId, newData } = action.payload;
      const index = state.discounts?.findIndex(
        (discount: any) => discount.id === discountId
      );
      if (index !== undefined && index !== -1) {
        state.discounts![index] = { ...state.discounts![index], ...newData };
      }
    },

    editProduct(
      state,
      action: PayloadAction<{ productId: string; newData: any }>
    ) {
      const { productId, newData } = action.payload;
      const index = state.products?.findIndex(
        (product: any) => product.id === productId
      );
      if (index !== undefined && index !== -1) {
        state.products![index] = { ...state.products![index], ...newData };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.categories = action.payload;
        }
      })
      .addCase(getDiscountsThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.discounts = action.payload;
        }
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.products = action.payload;
        }
      })

      .addCase(createCategoryThunk.fulfilled, (state, action: any) => {
        if (action.payload) {
          state.categories?.push(action.payload);
        }
      })
      .addCase(createDiscountThunk.fulfilled, (state, action: any) => {
        if (action.payload) {
          state.discounts?.push(action.payload);
        }
      })
      .addCase(createProductThunk.fulfilled, (state, action: any) => {
        if (action.payload) {
          state.products?.push(action.payload);
        }
      })

      .addCase(editCategoryThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.categories?.findIndex(
            (category: any) => category.id === action.payload?.id
          );
          if (index !== undefined && index !== -1) {
            state.categories![index] = {
              ...state.categories![index],
              ...action.payload,
            };
          }
        }
      })
      .addCase(editDiscountThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.discounts?.findIndex(
            (discount: any) => discount.id === action.payload?.id
          );
          if (index !== undefined && index !== -1) {
            state.discounts![index] = {
              ...state.discounts![index],
              ...action.payload,
            };
          }
        }
      })
      .addCase(editProductThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.products?.findIndex(
            (product: any) => product.id === action.payload?.id
          );
          if (index !== undefined && index !== -1) {
            state.products![index] = {
              ...state.products![index],
              ...action.payload,
            };
          }
        }
      })

      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        if (state.categories) {
          state.categories = state.categories.filter(
            (category) => category.id !== action.payload
          );
        }
      })
      .addCase(deleteDiscountThunk.fulfilled, (state, action) => {
        if (state.discounts) {
          state.discounts = state.discounts.filter(
            (discount) => discount.id !== action.payload
          );
        }
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        if (state.products) {
          state.products = state.products.filter(
            (product) => product.id !== action.payload
          );
        }
      })

      .addCase(getCurrentCategoryToEditThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.categories = [action.payload];
        }
      })
      .addCase(getCurrentDiscountToEditThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.discounts = [action.payload];
        }
      })
      .addCase(getCurrentProductToEditThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.products = [action.payload];
        }
      });
  },
});

export const adminReducer = adminSlice.reducer;
export const adminActions = {
  ...adminSlice.actions,
  getCategoriesThunk,
  getDiscountsThunk,
  getProductsThunk,

  createCategoryThunk,
  createDiscountThunk,
  createProductThunk,

  editCategoryThunk,
  editDiscountThunk,
  editProductThunk,

  deleteCategoryThunk,
  deleteDiscountThunk,
  deleteProductThunk,

  getCurrentCategoryToEditThunk,
  getCurrentDiscountToEditThunk,
  getCurrentProductToEditThunk,
};
