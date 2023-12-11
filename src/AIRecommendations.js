import React, { useState, useEffect } from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
    Typography,
    Modal,
  Backdrop,
  Fade,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
  } from "@mui/material";
  import Recommendations from './Recommendations';

  import clusteringImage from './images/aisle_clustering_plot.png'; 

function AIRecommendations() {
  // State variables to store the selected values
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedAisle, setSelectedAisle] = useState("");
  const [selectedStockingSection, setSelectedStockingSection] = useState("");
  const [storeStockingData, setStoreStockingData] = useState([]);
  const [storeNumbers, setStoreNumbers] = useState([]); // Corrected variable name
  const [aisles, setAisles] = useState([]);
  const [stockingSections, setStockingSections] = useState([]);
  const [showImage, setShowImage] = useState(false);

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

  const [showRecommendations, setShowRecommendations] = useState(false);

  // Function to toggle showing/hiding Recommendations
  const toggleRecommendations = () => {
    setShowImage(false);
    setShowRecommendations(!showRecommendations);
    
  };

  // Function to toggle showing/hiding Recommendations
  const toggleImages = () => {
    setShowRecommendations(false);
    setShowImage(!showImage)
  };


  return (
    <div>
       <Typography variant="h4" gutterBottom>
      AI based Recommendations/Simulations
       </Typography>
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
        <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={toggleImages}>
          Generate Item Clusters
        </Button>
        <Button variant="contained" color="primary" onClick={toggleRecommendations}>
          
          {showRecommendations ? 'View Reset Recommendations' : 'View Reset Recommendations'}
        </Button>
      </Grid>
    
    </Grid>
   {/* Content for AIRecommendations */}
   
      {/* Render Recommendations component at the bottom of the page */}
      {showRecommendations && (
        <div>
          <Typography variant="h6" align="center">
            
          </Typography>
          <Recommendations />
        </div>
      )}
       {showImage && (
        <div>
          <img src={clusteringImage} alt="Aisle Clustering Plot" />
        </div>
      )}
    </div>
  );
}

export default AIRecommendations;
