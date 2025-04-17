import React, { useState, useEffect } from "react";

const Sample = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(async () => {
          const reponse = await fetch("https://restcountries.com/v3.1/all");
          const result = await reponse.json();
          setData(result);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <h2>LOADING</h2>;

  return (
    <div>
      <h1>Countries</h1>
      <ul>
        {data.map((country, index) => (
          <li key={index}>{country.name.official}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sample;
