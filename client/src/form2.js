import { useRef } from "react";

export default function Form2() {
  const selectRef = useRef(null);
  const checkboxRef = useRef(null);
  const inputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Input value:", inputRef.current.value);
    console.log("Select value:", selectRef.current.value);
    console.log("Checkbox value:", checkboxRef.current.checked);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        <p>Name:</p>
        <input id="name" ref={inputRef} type="text" />
      </label>

      <label htmlFor="season">
        <p>Favorite season:</p>
        <select id="season" ref={selectRef}>
          <option value="spring">Spring</option>
          <option value="winter">Winter</option>
          <option value="summer">Summer</option>
          <option value="autumn">Autumn</option>
        </select>
      </label>

      <label htmlFor="animals">
        <p>Do you like animals?</p>
        <input id="animals" type="checkbox" ref={checkboxRef} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
