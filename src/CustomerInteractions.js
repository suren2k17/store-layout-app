import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField } from '@mui/material';

const CustomerInteractions = () => {
  const [data, setData] = useState([]); // Store the JSON data
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const [filter, setFilter] = useState(''); // Filter string

  // Load the JSON data from the public folder
  const loadData = async () => {
    try {
      const response = await fetch('/customer_data.json'); // Assuming your JSON file is in the public folder
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0);
  };

  // Filter data based on the filter string
  const filteredData = data.filter((item) =>
    item.CustomerInteractions.toString().includes(filter) ||
    item.StockingSection.toLowerCase().includes(filter.toLowerCase()) ||
    item.CustomerDemographics.toLowerCase().includes(filter.toLowerCase()) ||
    item.CustomerFeedback.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Customer Interactions</h1>
      <TextField
        label="Filter"
        value={filter}
        onChange={handleFilterChange}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Aisle Number</TableCell>
              <TableCell>Stocking Section</TableCell>
              <TableCell>Customer Interactions</TableCell>
              <TableCell>Customer Demographics</TableCell>
              <TableCell>Customer Feedback</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.AisleNumber}</TableCell>
                  <TableCell>{item.StockingSection}</TableCell>
                  <TableCell>{item.CustomerInteractions}</TableCell>
                  <TableCell>{item.CustomerDemographics}</TableCell>
                  <TableCell>{item.CustomerFeedback}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CustomerInteractions;
