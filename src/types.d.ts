export interface ProductType {
  id: string;
  name: string;
  price: number;
  photo: string;
  category: string;
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
