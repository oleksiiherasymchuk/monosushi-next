export type ProductType = {
  id?: string;
  name: string;
  category: string;
  path?: string;
  ingredients?: string;
  description?: string;
  price: string;
  weight?: string | number;
  imagePath: string;
  quantity?: number;
};

export type ProductsType = Array<ProductType> | null;
