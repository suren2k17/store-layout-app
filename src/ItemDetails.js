import React from 'react';

function ItemDetails({ items, onClose }) {
  return (
    <div>
      <h2>Item Details</h2>
      <table>
        <thead>
          <tr>
            <th>Item UPC</th>
            <th>Description</th>
            <th>CIC</th>
            <th>Position X</th>
            <th>Position Y</th>
            <th>Position Z</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.itemUPC}</td>
              <td>{item.itemDescription}</td>
              <td>{item.CIC}</td>
              <td>{item.position.x}</td>
              <td>{item.position.y}</td>
              <td>{item.position.z}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ItemDetails;
