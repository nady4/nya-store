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
export interface FetchDataOptions {
  setLoading?: (loading: boolean) => void;
  setError?: (error: string | null) => void;
}
export interface UseFetchDataReturn {
  product: ProductType | null;
  products: ProductType[] | null;
  loading: boolean | undefined;
  error: string | null | undefined;
}
