import React, { useEffect, useState } from "react";

function UseAxios() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch(() => {
        setError("Failed to fetch data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e)
    setFilteredData(
      data.filter((country) =>
        country.regiontoLowerCase().includes(search.toLowerCase())
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
        placeholder="Search res..."
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
