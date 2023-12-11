import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody  } from "@mui/material";

function StoreLayout() {
  const [storeData, setStoreData] = useState([]);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    // Fetch and process data here
    fetch('/Store_Stocking_Data.json')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.aisles.flatMap(aisle => 
          aisle.shelves.map(shelf => ({
            id: `${aisle.aisleNumber}-${shelf.shelfNumber}`,
            aisleNumber: aisle.aisleNumber,
            aislePosition: aisle.aislePosition,
            stockingSection: aisle.stockingSection,
            planogram: aisle.planogram,
            shelfNumber: shelf.shelfNumber,
            shelfHeight: Math.round(shelf.shelfHeight * 10) / 10,
            shelfWidth: Math.round(shelf.shelfWidth * 10) / 10,
            shelfDepth: Math.round(shelf.shelfDepth * 10) / 10,
            shelfSpacing: Math.round(shelf.shelfSpacing * 10) / 10,
            items: shelf.boxes.map(box => ({
              id: box.boxID,
              itemUPC: box.itemUPC,
              itemDescription: box.itemDescription,
              CIC: box.CIC,
              position_X: Math.round(box.position.x *10) / 10,
              position_Y: Math.round(box.position.y *10) / 10,
              position_Z: Math.round(box.position.z *10) / 10,
            })),
          }))
        );
        setStoreData(formattedData);
      })
      .catch(error => console.error('Error loading store data:', error));
  }, []);

  const columns = [
    { field: 'aisleNumber', headerName: 'Aisle Number', width: 130 },
    { field: 'aislePosition', headerName: 'Aisle Position', width: 130 },
    { field: 'stockingSection', headerName: 'Stocking Section', width: 160 },
    { field: 'planogram', headerName: 'Planogram', width: 130 },
    { field: 'shelfNumber', headerName: 'Shelf Number', width: 130 },
    { field: 'shelfHeight', headerName: 'Shelf Height', width: 130, type: 'number' },
    { field: 'shelfWidth', headerName: 'Shelf Width', width: 130, type: 'number' },
    { field: 'shelfDepth', headerName: 'Shelf Depth', width: 130, type: 'number' },
    { field: 'shelfSpacing', headerName: 'Shelf Spacing', width: 130, type: 'number' },
    {
      field: 'items',
      headerName: 'Items',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setCurrentItems(params.row.items);
            setShowItemDetails(true);
          }}
        >
          View Items
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: "100vh", width: '100%' }}>
      <DataGrid rows={storeData} columns={columns} pageSize={10} 
       />
      <Dialog open={showItemDetails} onClose={() => setShowItemDetails(false)}
      sx={{ maxWidth: "100%" }}>
        <DialogTitle>Item Details</DialogTitle>
        <DialogContent>
        <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item ID</TableCell>
                  <TableCell>Item UPC</TableCell>
                  <TableCell>Item Description</TableCell>
                  <TableCell>CIC</TableCell>
                  <TableCell>Position X</TableCell>
                  <TableCell>Position Y</TableCell>
                  <TableCell>Position Z</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.itemUPC}</TableCell>
                    <TableCell>{item.itemDescription}</TableCell>
                    <TableCell>{item.CIC}</TableCell>
                    <TableCell>{item.position_X}</TableCell>
                    <TableCell>{item.position_Y}</TableCell>
                    <TableCell>{item.position_Z}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StoreLayout;
