"use client";
import { useEffect, useState } from "react";
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

  const [activeCategories, setActiveCategories] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const newActiveCategories = { ...activeCategories };

    categories.forEach((category) => {
      if (!(category in newActiveCategories)) {
        newActiveCategories[category] = true;
      }
    });
  }, [categories, activeCategories]);

  const onButtonClick = (category: string) => {
    const newActiveCategories = { ...activeCategories };
    newActiveCategories[category] = !newActiveCategories[category];
    setActiveCategories(newActiveCategories);
  };

  return (
    <div className="search-bar">
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={
              tomorrow.className +
              " category-button" +
              ` ${activeCategories[category] ? "active" : ""}`
            }
            onClick={() => onButtonClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
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
