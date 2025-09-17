import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, Pagination, IconButton, Chip, TableSortLabel } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, People as PeopleIcon, PersonAdd as PersonAddIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function ClaimSummary({ user, onLogout }) {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [search, setSearch] = useState('');
  const [editClaim, setEditClaim] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState({ clientInfo: {}, claimDetails: {} });
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

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
    setPage(1); // Reset to first page when searching
    fetchClaims(e.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Sorting functionality
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedClaims = () => {
    if (!sortConfig.key) return claims;
    
    return [...claims].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortConfig.key) {
        case 'id':
          aValue = a.id;
          bValue = b.id;
          break;
        case 'clientName':
          aValue = `${a.clientInfo.firstName} ${a.clientInfo.lastName}`;
          bValue = `${b.clientInfo.firstName} ${b.clientInfo.lastName}`;
          break;
        case 'policyNumber':
          aValue = a.claimDetails.policyNumber;
          bValue = b.claimDetails.policyNumber;
          break;
        case 'claimType':
          aValue = a.claimDetails.claimType;
          bValue = b.claimDetails.claimType;
          break;
        case 'dateOfIncident':
          aValue = new Date(a.claimDetails.dateOfIncident);
          bValue = new Date(b.claimDetails.dateOfIncident);
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          return 0;
      }
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const sortedClaims = getSortedClaims();
  const paginatedClaims = sortedClaims.slice(startIndex, endIndex);
  const totalPagesAfterSort = Math.ceil(sortedClaims.length / rowsPerPage);

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
      {/* MetLife Logo Header */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <img src="/download.png" alt="MetLife Logo" style={{ maxWidth: 180, maxHeight: 60 }} />
      </Box>
      
      {/* Enhanced Navigation Bar */}
      <Paper elevation={3} sx={{ mb: 3, p: 2, backgroundColor: '#f8f9fa' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Claim Summary
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => navigate('/new-claim')} 
              startIcon={<AddIcon />}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '14px',
                padding: '8px 16px'
              }}
            >
              New Claim
            </Button>
            {user.role === 'admin' && (
              <>
                <Button 
                  variant="contained" 
                  color="success" 
                  onClick={() => navigate('/add-user')} 
                  startIcon={<PersonAddIcon />}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '14px',
                    padding: '8px 16px'
                  }}
                >
                  Add User
                </Button>
                <Button 
                  variant="contained" 
                  color="info" 
                  onClick={() => navigate('/admin-users')} 
                  startIcon={<PeopleIcon />}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '14px',
                    padding: '8px 16px'
                  }}
                >
                  View Users
                </Button>
              </>
            )}
            <Box sx={{ ml: 2, pl: 2, borderLeft: '1px solid #ddd' }}>
              <Chip 
                label={`${user.username} (${user.role})`} 
                color="primary" 
                variant="outlined" 
                sx={{ mr: 2 }}
              />
              <Button 
                variant="outlined" 
                color="error" 
                onClick={onLogout}
                startIcon={<LogoutIcon />}
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '14px',
                  padding: '8px 16px'
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
      <TextField label="Search by Name or ID" value={search} onChange={handleSearch} fullWidth sx={{ mb: 2 }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortConfig.key === 'id'}
                  direction={sortConfig.key === 'id' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('id')}
                  sx={{ 
                    color: 'white !important',
                    '& .MuiTableSortLabel-icon': { color: 'white !important' }
                  }}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortConfig.key === 'clientName'}
                  direction={sortConfig.key === 'clientName' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('clientName')}
                  sx={{ 
                    color: 'white !important',
                    '& .MuiTableSortLabel-icon': { color: 'white !important' }
                  }}
                >
                  Client Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortConfig.key === 'policyNumber'}
                  direction={sortConfig.key === 'policyNumber' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('policyNumber')}
                  sx={{ 
                    color: 'white !important',
                    '& .MuiTableSortLabel-icon': { color: 'white !important' }
                  }}
                >
                  Policy #
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortConfig.key === 'claimType'}
                  direction={sortConfig.key === 'claimType' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('claimType')}
                  sx={{ 
                    color: 'white !important',
                    '& .MuiTableSortLabel-icon': { color: 'white !important' }
                  }}
                >
                  Type
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortConfig.key === 'dateOfIncident'}
                  direction={sortConfig.key === 'dateOfIncident' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('dateOfIncident')}
                  sx={{ 
                    color: 'white !important',
                    '& .MuiTableSortLabel-icon': { color: 'white !important' }
                  }}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortConfig.key === 'status'}
                  direction={sortConfig.key === 'status' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('status')}
                  sx={{ 
                    color: 'white !important',
                    '& .MuiTableSortLabel-icon': { color: 'white !important' }
                  }}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedClaims.map(claim => (
              <TableRow key={claim.id}>
                <TableCell>{claim.id}</TableCell>
                <TableCell>{claim.clientInfo.firstName} {claim.clientInfo.lastName}</TableCell>
                <TableCell>{claim.claimDetails.policyNumber}</TableCell>
                <TableCell>{claim.claimDetails.claimType}</TableCell>
                <TableCell>{claim.claimDetails.dateOfIncident}</TableCell>
                <TableCell>{claim.status}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEdit(claim)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => setDeleteId(claim.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Pagination */}
      {totalPagesAfterSort > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination 
            count={totalPagesAfterSort} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
          />
        </Box>
      )}
      
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
