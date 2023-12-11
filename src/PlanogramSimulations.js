import React, { useState, useEffect } from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid
  } from "@mui/material";

function PlanogramSimulationsMenu() {
  // URL of the external HTML page
  const externalPageURL = "http://127.0.0.1:5500/index.html";

  // State to track whether the external page should be loaded
  const [loadExternalPage, setLoadExternalPage] = useState(false);

  // Function to load the external HTML page within the iframe
  const handleLoadExternalPage = () => {
    setLoadExternalPage(true);
  };

  // State variables to store the selected values
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedAisle, setSelectedAisle] = useState("");
  const [selectedStockingSection, setSelectedStockingSection] = useState("");
  const [storeStockingData, setStoreStockingData] = useState([]);
  const [storeNumbers, setStoreNumbers] = useState([]); // Corrected variable name
  const [aisles, setAisles] = useState([]);
  const [stockingSections, setStockingSections] = useState([]);

  // Fetch the JSON data when the component mounts
  useEffect(() => {
    fetch("/Store_Stocking_Data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setStoreStockingData(data);
        // Extract store numbers, aisles, and stocking sections from the JSON
        const storeNumbers = [data.storeNbr];
        const aisleNumbers = data.aisles.map((aisle) => aisle.aisleNumber);
        const stockingSections = data.aisles.map(
          (aisle) => aisle.stockingSection
        );

        setStoreNumbers(storeNumbers);
        setAisles(aisleNumbers);
        setStockingSections(stockingSections);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  return (
      
      <Grid container spacing={2}> {/* Wrap the content in a Grid container */}
      <Grid item xs={12} sm={4}> {/* Use responsive sizing */}
        <FormControl fullWidth>
          <InputLabel>Select Store</InputLabel>
          <Select
            value={selectedStore}
            onChange={(event) => setSelectedStore(event.target.value)}
          >
            {storeNumbers.map((store) => (
              <MenuItem key={store} value={store}>
                {store}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}> {/* Use responsive sizing */}
        <FormControl fullWidth>
          <InputLabel>Select Aisle</InputLabel>
          <Select
            value={selectedAisle}
            onChange={(event) => setSelectedAisle(event.target.value)}
          >
            {aisles.map((aisle) => (
              <MenuItem key={aisle} value={aisle}>
                {aisle}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}> {/* Use responsive sizing */}
        <FormControl fullWidth>
          <InputLabel>Select Stocking Section</InputLabel>
          <Select
            value={selectedStockingSection}
            onChange={(event) =>
              setSelectedStockingSection(event.target.value)
            }
          >
            {stockingSections.map((section) => (
              <MenuItem key={section} value={section}>
                {section}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
      <Button variant="contained" color="primary" onClick={handleLoadExternalPage}>Simulate Planogram</Button>
      {loadExternalPage && (
        <iframe
          src={externalPageURL}
          title="External Page"
          width="100%"
          height="500px" // Set the desired height
        ></iframe>
      )}
    </Grid>
    </Grid>
  );
}

export default PlanogramSimulationsMenu;
