import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ClaimSummary({ user, onLogout }) {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [search, setSearch] = useState('');
  const [editClaim, setEditClaim] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState({ clientInfo: {}, claimDetails: {} });

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async (query = '') => {
    const url = query ? `http://localhost:4000/api/claims?search=${query}` : 'http://localhost:4000/api/claims';
    const res = await fetch(url);
    const data = await res.json();
    setClaims(data);
  };

  const handleSearch = e => {
    setSearch(e.target.value);
    fetchClaims(e.target.value);
  };

  const handleEdit = claim => {
    setEditClaim(claim.id);
    setEditData({ clientInfo: { ...claim.clientInfo }, claimDetails: { ...claim.claimDetails } });
  };

  const handleEditChange = e => {
    const { name, value } = e.target;
    if (name in editData.clientInfo) {
      setEditData({ ...editData, clientInfo: { ...editData.clientInfo, [name]: value } });
    } else {
      setEditData({ ...editData, claimDetails: { ...editData.claimDetails, [name]: value } });
    }
  };

  const handleEditSave = async () => {
    await fetch(`http://localhost:4000/api/claims/${editClaim}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData)
    });
    setEditClaim(null);
    fetchClaims(search);
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:4000/api/claims/${deleteId}`, { method: 'DELETE' });
    setDeleteId(null);
    fetchClaims(search);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Claim Summary</Typography>
        <Box>
          <Button variant="contained" color="primary" onClick={() => navigate('/new-claim')} sx={{ mr: 2 }}>
            New Claim
          </Button>
          {user.role === 'admin' && (
            <>
              <Button variant="contained" color="success" onClick={() => navigate('/add-user')} sx={{ mr: 2 }}>
                Add User
              </Button>
              <Button variant="contained" color="info" onClick={() => navigate('/admin-users')} sx={{ mr: 2 }}>
                View Users
              </Button>
            </>
          )}
          <Button variant="outlined" color="secondary" onClick={onLogout}>
            Logout
          </Button>
        </Box>
      </Box>
      <TextField label="Search by Name or ID" value={search} onChange={handleSearch} fullWidth sx={{ mb: 2 }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Client Name</TableCell>
              <TableCell>Policy #</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {claims.map(claim => (
              <TableRow key={claim.id}>
                <TableCell>{claim.id}</TableCell>
                <TableCell>{claim.clientInfo.firstName} {claim.clientInfo.lastName}</TableCell>
                <TableCell>{claim.claimDetails.policyNumber}</TableCell>
                <TableCell>{claim.claimDetails.claimType}</TableCell>
                <TableCell>{claim.claimDetails.dateOfIncident}</TableCell>
                <TableCell>{claim.status}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleEdit(claim)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => setDeleteId(claim.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Edit Modal */}
      <Dialog open={!!editClaim} onClose={() => setEditClaim(null)}>
        <DialogTitle>Edit Claim</DialogTitle>
        <DialogContent>
          <TextField label="First Name" name="firstName" value={editData.clientInfo.firstName || ''} onChange={handleEditChange} fullWidth sx={{ mt: 2 }} />
          <TextField label="Last Name" name="lastName" value={editData.clientInfo.lastName || ''} onChange={handleEditChange} fullWidth sx={{ mt: 2 }} />
          <TextField label="Email" name="email" value={editData.clientInfo.email || ''} onChange={handleEditChange} fullWidth sx={{ mt: 2 }} />
          <TextField label="Phone" name="phone" value={editData.clientInfo.phone || ''} onChange={handleEditChange} fullWidth sx={{ mt: 2 }} />
          <TextField label="Policy Number" name="policyNumber" value={editData.claimDetails.policyNumber || ''} onChange={handleEditChange} fullWidth sx={{ mt: 2 }} />
          <TextField label="Claim Type" name="claimType" value={editData.claimDetails.claimType || ''} onChange={handleEditChange} fullWidth sx={{ mt: 2 }} />
          <TextField label="Date of Incident" name="dateOfIncident" value={editData.claimDetails.dateOfIncident || ''} onChange={handleEditChange} fullWidth sx={{ mt: 2 }} />
          <TextField label="Description" name="description" value={editData.claimDetails.description || ''} onChange={handleEditChange} fullWidth multiline rows={3} sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditClaim(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Confirmation */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete Claim</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this claim?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ClaimSummary;
