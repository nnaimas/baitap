import { useState } from "react";

export default function Form1() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Name: ${formData.name}, Email: ${formData.email}, Phone: ${formData.phone}`
    );
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="phone">Phone:</label>
      <textarea
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
