import Link from "next/link";
import Image from "next/image";
import cat from "../../public/assets/cat.svg";
import home from "../../public/assets/home.svg";
import cart from "../../public/assets/cart.svg";
import heart from "../../public/assets/heart.svg";
import orders from "../../public/assets/orders.svg";
import user from "../../public/assets/user.svg";
import logout from "../../public/assets/logout.svg";
//import { getServerSession } from "next-auth/next";
//import { authOptions } from "../api/auth/[...nextauth]/route";

function NavBar() {
  //const session = getServerSession(authOptions);

  return (
    <div>
      <Image src={cat} alt="cat" />
      <Link href="/">
        <Image src={home} alt="home" />
      </Link>
      <Link href="/cart">
        <Image src={cart} alt="cart" />
      </Link>
      <Link href="/wishlists">
        <Image src={heart} alt="heart" />
      </Link>
      <Link href="/orders">
        <Image src={orders} alt="orders" />
      </Link>
      <Link href="/profile">
        <Image src={user} alt="user" />
      </Link>
      <Link href="/auth/logout">
        <Image src={logout} alt="logout" />
      </Link>
    </div>
  );
}

export default NavBar;
