import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NewClaim from './pages/NewClaim';
import ClaimSummary from './pages/ClaimSummary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/new-claim" element={<NewClaim />} />
        <Route path="/claims" element={<ClaimSummary />} />
        <Route path="/" element={<Navigate to="/claims" />} />
      </Routes>
    </Router>
  );
}

export default App;
