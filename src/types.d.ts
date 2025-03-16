export interface ProductType {
  id: string;
  name: string;
  price: number;
  photo: string;
  category: string;
}

export interface ProductsType {
  products: ProductTypoe[];
}
