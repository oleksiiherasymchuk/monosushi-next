// import { ProductType, ProductsType } from "@/shared/types/products/product";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

// export const productApi = createApi({
//   reducerPath: 'api/products',
//   baseQuery: fetchBaseQuery({ baseUrl: '' }),
//   endpoints: build => ({
//     getProdcuts: build.query<ProductType[], number>({query: (limit = 5) => `products?limit=${limit}`})
//   })
// })

// export const { useGetProductsQuery } = productApi