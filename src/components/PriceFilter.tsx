import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setMin, setMax } from "@/store/slices/priceSlice";
import "../styles/PriceFilter.scss";

const DoubleRangeSlider = () => {
  const dispatch = useAppDispatch();
  const { min, max } = useAppSelector((state) => state.price);
  const minLimit = 0;
  const maxLimit = 100;

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(event.target.value), max - 1);
    dispatch(setMin(value));
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(event.target.value), min + 1);
    dispatch(setMax(value));
  };

  return (
    <div
      className="price-filter"
      style={
        {
          "--min": `${((min - minLimit) / (maxLimit - minLimit)) * 100}%`,
          "--max": `${((max - minLimit) / (maxLimit - minLimit)) * 100}%`,
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
        <span className="min-value">{min}</span>
        <span className="max-value">{max}</span>
      </div>
    </div>
  );
};

export default DoubleRangeSlider;
