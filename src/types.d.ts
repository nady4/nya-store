export interface ProductType {
  id: string;
  name: string;
  price: number;
  photo: string;
  category: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string | null;
  postalCode: string;
  country: string;
}

export interface AddressProps {
  initialAddress: Omit<Address, "id"> | null;
}

export interface OrderType {
  id: string;
  address: Address;
  createdAt: Date;
  products: (ProductType & { quantity: number })[];
  total: number;
  status: string;
}

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    username?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      username?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    username?: string;
  }
}
