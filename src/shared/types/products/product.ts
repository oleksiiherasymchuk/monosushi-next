export type ProductType = {
  id?: number | string;
  name: string;
  category: string;
  path: string;
  ingredients: string;
  price: string | number;
  weight: string | number;
  imagePath: string
};

export type ProductsType = Array<ProductType> | null;
