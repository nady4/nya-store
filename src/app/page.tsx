import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return <div></div>;
}

export default Home;
