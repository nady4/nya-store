export interface ProductProps {
  id: string;
  name: string;
  price: number;
  photo: string;
  category: string;
}

export interface ProductsProps {
  products: ProductProps[];
}
