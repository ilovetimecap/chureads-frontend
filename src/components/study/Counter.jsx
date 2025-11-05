import React, { useState } from "react";

const Counter = () => {
  //Logic
  // let count = 0
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
    console.log("count", count);
  };

  // View
  return (
    <div>
      <h1>{count}</h1>
      <button
        type="button"
        style={{ border: "1px solid white" }}
        onClick={handleIncrease}
      >
        +1
      </button>
      <button type="button" style={{ border: "1px solid white" }}>
        -1
      </button>
    </div>
  );
};

export default Counter;
