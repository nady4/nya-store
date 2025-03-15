import { useState } from "react";
import "../styles/PriceFilter.scss";

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
}

const DoubleRangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
}) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(event.target.value), maxValue - step);
    setMinValue(value);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(event.target.value), minValue + step);
    setMaxValue(value);
  };

  return (
    <div
      className="price-filter"
      style={
        {
          "--min": `${((minValue - min) / (max - min)) * 100}%`,
          "--max": `${((maxValue - min) / (max - min)) * 100}%`,
        } as React.CSSProperties
      }
    >
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minValue}
        onChange={handleMinChange}
        className="price-filter-input min-range"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxValue}
        onChange={handleMaxChange}
        className="price-filter-input max-range"
      />
      <div className="range-values">
        <span className="min-value">{minValue}</span>
        <span className="max-value">{maxValue}</span>
      </div>
    </div>
  );
};

export default DoubleRangeSlider;
