export interface ProductType {
  id: string;
  name: string;
  price: number;
  photo: string;
  category: string;
}

export interface ProductsType {
  products: ProductType[];
}

export interface CatalogProps {
  products: ProductType[];
}

export interface ProductListProps {
  products: ProductType[];
}

export interface SearchBarProps {
  products: ProductType[];
}
