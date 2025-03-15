import SearchBar from "@/components/SearchBar";
import ProductList from "@/components/ProductList";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function Home() {
  const products = await prisma.product.findMany();

  return (
    <div className="home-container">
      <SearchBar products={products} />
      <ProductList products={products} />
    </div>
  );
}

export default Home;
