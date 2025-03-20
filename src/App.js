import React, { useState } from "react";
function App() {
  const [yourName, setName] = useState("");
  return (
    <div>
      <label>Name: </label>
      <input
        type="text"
        value={yourName}
        onChange={(event) => setName(event.target.value)}
      />

      <h1>Hello {yourName} !</h1>
    </div>
  );
}
