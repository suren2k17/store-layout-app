import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const Recommendations = () => {
  const [recommendationsData, setRecommendationsData] = useState(null);

  useEffect(() => {
    // Fetch and parse the recommendations.json file from the public folder
    const fetchData = async () => {
      try {
        const response = await fetch('/recommendations.json'); // Assuming your JSON file is in the public folder
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setRecommendationsData(jsonData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  if (!recommendationsData) {
    // Data is still loading
    return <div>Loading...</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Stocking Section</TableCell>
            <TableCell>Current Aisle</TableCell>
            <TableCell>Recommended Aisle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recommendationsData.recommendations.map((recommendation, index) => (
            <TableRow key={index}>
              <TableCell>{recommendation.stockingSection}</TableCell>
              <TableCell>{recommendation.currentAisle}</TableCell>
              <TableCell
                style={{
                  backgroundColor:
                  parseInt(recommendation.currentAisle.slice(1),10) > parseInt(recommendation.recommendedAisle.slice(1),10)
                      ? 'darkgreen'
                      : 'darkred',
                  color: 'white',
                }}
              >
                {recommendation.recommendedAisle}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default Recommendations;
