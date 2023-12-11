import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import StoreLayout from './StoreLayout';
import NavigationMenu from './NavigationMenu';
import { makeStyles } from '@mui/styles';
// Import other components here

// Placeholder components - replace with actual component imports
import PlanogramSimulations from './PlanogramSimulations';
import AIRecommendations from './AIRecommendations';
import ARStore from './ARStore';
import CustomerInteractions from './CustomerInteractions';
import Sales from './Sales';
import Inventory from './Inventory';
import SupplyChain from './SupplyChain';
import LocalizedInteractions from './LocalizedInteractions';

const useStyles = makeStyles({
  content: {
    flexGrow: 1,
    padding: '20px',
    marginLeft: '240px', // Adjust based on the width of the navigation menu
  },
});

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className="App">
        <NavigationMenu />
        <main className={classes.content}>
          <Routes>
            <Route path="/store-layout" element={<StoreLayout />} />
            <Route path="/planogram-simulations" element={<PlanogramSimulations />} />
            <Route path="/ai-recommendations" element={<AIRecommendations />} />
            <Route path="/ar-store" element={<ARStore />} />
            <Route path="/customer-interactions" element={<CustomerInteractions />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/supply-chain" element={<SupplyChain />} />
            <Route path="/localized-interactions" element={<LocalizedInteractions />} />
            <Route path="/" element={<Navigate replace to="/store-layout" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
