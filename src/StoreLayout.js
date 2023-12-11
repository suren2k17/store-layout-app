import React, { useState, useEffect } from 'react';
import ItemDetails from './ItemDetails';

function StoreLayout() {
  const [storeData, setStoreData] = useState(null);
  const [selectedStore, setSelectedStore] = useState('');
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    fetch('/Store_Stocking_Data.json')
      .then(response => response.json())
      .then(data => {
        setStoreData(data);
        setSelectedStore(data.storeNbr);
      })
      .catch(error => console.error('Error loading store data:', error));
  }, []);

  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
  };

  const handleShowItemDetails = (items) => {
    setCurrentItems(items);
    setShowItemDetails(true);
  };

  const handleCloseItemDetails = () => {
    setShowItemDetails(false);
  };

  const renderTableRows = () => {
    return storeData && storeData.aisles.map(aisle => (
      aisle.shelves.map(shelf => (
        <tr key={`${aisle.aisleNumber}-${shelf.shelfNumber}`}>
          <td>{aisle.aisleNumber}</td>
          <td>{aisle.aislePosition}</td>
          <td>{aisle.stockingSection}</td>
          <td>{aisle.planogram}</td>
          <td>{shelf.shelfNumber}</td>
          <td>{shelf.shelfHeight}</td>
          <td>{shelf.shelfWidth}</td>
          <td>{shelf.shelfDepth}</td>
          <td>{shelf.shelfSpacing}</td>
          <td>
            <button 
                onClick={() => handleShowItemDetails(shelf.boxes)}
                style={{ background: 'none', border: 'none', padding: 0, color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                >
                View Items
            </button>
          </td>
        </tr>
      ))
    ));
  };

  return (
    <div>
      <h1>Store Layout</h1>
      <select value={selectedStore} onChange={handleStoreChange}>
        {storeData && <option value={storeData.storeNbr}>{storeData.storeNbr}</option>}
      </select>
      <table>
        <thead>
          <tr>
            <th>Aisle Number</th>
            <th>Aisle Position</th>
            <th>Stocking Section</th>
            <th>Planogram</th>
            <th>Shelf Number</th>
            <th>Shelf Height</th>
            <th>Shelf Width</th>
            <th>Shelf Depth</th>
            <th>Shelf Spacing</th>
            <th>Item Details</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
      {showItemDetails && (
        <ItemDetails items={currentItems} onClose={handleCloseItemDetails} />
      )}
    </div>
  );
}

export default StoreLayout;
