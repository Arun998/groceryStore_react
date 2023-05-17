/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import "./App.css";
function Product() {
  const [data, setData] = useState([]);
  const [item, setItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products?page=${page}`
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json["products"]);
        setLoading(false);
      });
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
    
  };
  return (
    <>
      <div className="inpt">
        <input
          type="text"
          className="search"
          placeholder="search for products"
          onChange={(e) => setItem(e.target.value)}
        />
        <SearchIcon className="icon" />
      </div>
      {loading ? (
        <h1>...Loading</h1>
      ) : (
        <div className="container">
          {data
            .filter((value) => {
              if (item === "") {
                return value;
              } else if (
                value.name.toLowerCase().includes(item.toLowerCase())
              ) {
                return value;
              }
            })
            .map((x) => (
              <div key={x.id} className="card">
                <div className="image">
                  <img src={x["images"].front} alt="" />
                </div>

                <div className="content">
                  <h1>{x.name}</h1>
                  <p>{x.description}</p>
                  <h2>
                    <b>MRP</b> ${x["mrp"].mrp}
                  </h2>
                  <Button variant="contained">Buy NOW</Button>
                </div>
              </div>
            ))}
        </div>
      )}
      <Stack spacing={2} className="pagination">
        <Pagination count={10} page={page} onChange={handleChange} />
      </Stack>
    </>
  );
}

export default Product;
