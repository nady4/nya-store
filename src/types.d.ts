export interface ProductType {
  id: string;
  name: string;
  price: number;
  photo: string;
  category: string;
}
export interface ProductCardProps extends ProductType {
  wishListIds: string[];
  userId: string;
}
