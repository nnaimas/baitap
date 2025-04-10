import React, { useEffect, useState } from "react";
import axios from "axios";

function UseAxios() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(() => {
        setError("Failed to fetch data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    setFilteredData(
      data.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Countries</h1>
      <input
        type="text"
        placeholder="Search country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <table
        border="1"
        style={{ marginTop: "20px", width: "100%", textAlign: "left" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Languages</th>
            <th>Area (km²)</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((country, index) => (
            <tr key={index}>
              <td>{country.name.common}</td>
              <td>
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "N/A"}
              </td>
              <td>{country.area.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UseAxios;
