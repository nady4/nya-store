import Catalog from "@/components/Catalog";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function Home() {
  const products = await prisma.product.findMany();

  return <Catalog products={products} />;
}

export default Home;
