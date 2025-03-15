"use client";
import Image from "next/image";
import search from "../../public/assets/search.svg";
import PriceFilter from "./PriceFilter";
import { tomorrow } from "@/app/fonts";
import { ProductsProps } from "@/types";
import "../styles/SearchBar.scss";

function SearchBar({ products }: ProductsProps) {
  const categories = products
    .map((product) => product.category)
    .filter((category, index, array) => array.indexOf(category) === index);

  return (
    <div className="search-bar">
      <select className="category-filter">
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>
      <div className="search-box">
        <input type="text" className={tomorrow.className + " search-input"} />
        <button className="search-button">
          <Image src={search} alt="search icon" height={20} />
        </button>
      </div>
      <PriceFilter min={0} max={100} step={1} />
    </div>
  );
}

export default SearchBar;
