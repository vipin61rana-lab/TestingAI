import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NewClaim from './pages/NewClaim';
import ClaimSummary from './pages/ClaimSummary';
import Login from './pages/Login';
import AddUser from './pages/AddUser';
import AdminUsers from './pages/AdminUsers';

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => setUser(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/new-claim" element={<NewClaim user={user} onLogout={handleLogout} />} />
        <Route path="/claims" element={<ClaimSummary user={user} onLogout={handleLogout} />} />
        {user.role === 'admin' && (
          <>
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/admin-users" element={<AdminUsers />} />
          </>
        )}
        <Route path="/" element={<Navigate to="/claims" />} />
      </Routes>
    </Router>
  );
}

export default App;
