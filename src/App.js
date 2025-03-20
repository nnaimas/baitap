import React, { useState, useEffect } from "react";

function App() {
  const [yourName, setName] = useState("");

  useEffect(() => {
    document.title = yourName ? `Xin chào ${yourName}!` : "Chào bạnbạn!";
  }, [yourName]);

  return (
    <div>
      <label>Nhập tên: </label>
      <input
        type="text"
        value={yourName}
        onChange={(event) => setName(event.target.value)}
      />
      <h1>Xin chào {yourName} !</h1>
    </div>
  );
}

export default App;
