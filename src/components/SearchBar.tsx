"use client";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleCategory } from "@/store/slices/categorySlice";
import PriceFilter from "./PriceFilter";
import search from "../../public/assets/icons/search.svg";
import { tomorrow } from "@/app/fonts";
import { SearchBarProps } from "@/types";
import "../styles/SearchBar.scss";

function SearchBar({ products }: SearchBarProps) {
  console.log(products);
  const { categories, activeCategories } = useAppSelector(
    (state) => state.category
  );
  const dispatch = useAppDispatch();

  const onButtonClick = (category: string) => {
    dispatch(toggleCategory(category));
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
