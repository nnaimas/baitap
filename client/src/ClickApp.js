import React, { useState } from "react";
function Example() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Bạn đã ấn click chuột {count} lần</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
}
export default Example