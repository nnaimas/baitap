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
       <label>
         <p>Name:</p>
         <input ref={inputRef} type="text" />
       </label>
       <label>
         <p>Favorite season:</p>
         <select ref={selectRef}>
           <option value="spring">Spring</option>
           <option value="winter">Winter</option>
           <option value="summer">Summer</option>
           <option value="autumn">Autumnn</option>
         </select>
       </label>
       <label>
         Do you like animals?
         <input type="checkbox" ref={checkboxRef} />
       </label>
       <button type="submit">Submit</button>
     </form>
   );
 }
