import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProductList from "@/components/ProductList";

async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className="home-container">
      <ProductList />
    </div>
  );
}

export default Home;
