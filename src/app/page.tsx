import Catalog from "@/components/Catalog";
import prisma from "@/libs/prisma";

async function Home() {
  const products = await prisma.product.findMany();
  return <Catalog products={products} />;
}

export default Home;
