import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setMin, setMax } from "@/store/slices/priceSlice";
import "../styles/PriceFilter.scss";

const DoubleRangeSlider = () => {
  const dispatch = useAppDispatch();
  const { min, max } = useAppSelector((state) => state.price);
  const minLimit = 0;
  const maxLimit = 100;

  const handleMinChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setMin(Math.min(Number(event.target.value), max - 1)));
    },
    [dispatch, max]
  );

  const handleMaxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setMax(Math.max(Number(event.target.value), min + 1)));
    },
    [dispatch, min]
  );

  const minPercent = ((min - minLimit) / (maxLimit - minLimit)) * 100;
  const maxPercent = ((max - minLimit) / (maxLimit - minLimit)) * 100;

  return (
    <div
      className="price-filter"
      style={
        {
          "--min": `${minPercent}%`,
          "--max": `${maxPercent}%`,
        } as React.CSSProperties
      }
    >
      <input
        type="range"
        min={minLimit}
        max={maxLimit}
        step={1}
        value={min}
        onChange={handleMinChange}
        className="price-filter-input min-range"
      />
      <input
        type="range"
        min={minLimit}
        max={maxLimit}
        step={1}
        value={max}
        onChange={handleMaxChange}
        className="price-filter-input max-range"
      />
      <div className="range-values">
        <span className="min-value" style={{ left: `${minPercent}%` }}>
          {min}
        </span>
        <span className="max-value" style={{ left: `${maxPercent}%` }}>
          {max}
        </span>
      </div>
    </div>
  );
};

export default DoubleRangeSlider;
