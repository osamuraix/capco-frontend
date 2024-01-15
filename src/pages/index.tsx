import { useAppDispatch, useAppSelector } from "@/store";
import { clear, postCalculator } from "@/store/reducers/calculatorSlice";
import React, { useEffect, useState } from "react";

const Calculator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { result } = useAppSelector((state) => state.calculatorSlice);
  const [inputDisplay, setInputDisplay] = useState(0);
  const [inputSign, setInputSign] = useState("");

  const [inputFirst, setInputFirst] = useState(0);
  const [inputSecond, setInputSecond] = useState(0);

  const handleButtonClick = (value) => {
    if (value === "=") {
      dispatch(
        postCalculator({ first: inputFirst, second: inputSecond }, inputSign)
      );
    } else if (value === "C") {
      setInputDisplay(0);
      setInputFirst(null);

      dispatch(clear());
    } else if (
      ["plus", "minus", "multiply", "divide", "percentage"].includes(value)
    ) {
      setInputSign(value);
    } else {
      if (!inputFirst) {
        setInputFirst(value);
      } else {
        setInputSecond(value);
      }

      setInputDisplay(value);
    }
  };

  useEffect(() => {
    setInputFirst(result);
    setInputDisplay(result);
  }, [result]);

  return (
    <div>
      <div>
        <input type="text" value={inputDisplay} readOnly />
      </div>
      <div>
        <button onClick={() => handleButtonClick(1)}>1</button>
        <button onClick={() => handleButtonClick(2)}>2</button>
        <button onClick={() => handleButtonClick(3)}>3</button>
        <button onClick={() => handleButtonClick("plus")}>+</button>
      </div>
      <div>
        <button onClick={() => handleButtonClick(4)}>4</button>
        <button onClick={() => handleButtonClick(5)}>5</button>
        <button onClick={() => handleButtonClick(6)}>6</button>
        <button onClick={() => handleButtonClick("minus")}>-</button>
      </div>
      <div>
        <button onClick={() => handleButtonClick(7)}>7</button>
        <button onClick={() => handleButtonClick(8)}>8</button>
        <button onClick={() => handleButtonClick(9)}>9</button>
        <button onClick={() => handleButtonClick("multiply")}>*</button>
      </div>
      <div>
        <button onClick={() => handleButtonClick(0)}>0</button>
        <button onClick={() => handleButtonClick("=")}>=</button>
        <button onClick={() => handleButtonClick("percentage")}>%</button>
        <button onClick={() => handleButtonClick("divide")}>/</button>
      </div>
      <div>
        <button onClick={() => handleButtonClick("C")}>C</button>
      </div>
      <div>
        <p>Result: {result}</p>
      </div>
    </div>
  );
};

export default Calculator;
