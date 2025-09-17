import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Pagination, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [editUser, setEditUser] = useState(null);
  const [deleteUsername, setDeleteUsername] = useState(null);
  const [editData, setEditData] = useState({ username: '', role: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:4000/api/users');
    const data = await res.json();
    setUsers(data);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
      });
      if (!res.ok) throw new Error('Failed to add user');
      setSuccess('User added successfully!');
      setUsername('');
      setPassword('');
      setRole('user');
      setPage(1); // Reset to first page after adding user
      await fetchUsers();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Pagination logic
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);

  // Edit user functionality
  const handleEdit = user => {
    setEditUser(user.username);
    setEditData({ username: user.username, role: user.role });
  };

  const handleEditChange = e => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/users/${editUser}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      });
      if (!res.ok) throw new Error('Failed to update user');
      setEditUser(null);
      setSuccess('User updated successfully!');
      await fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/users/${deleteUsername}`, { 
        method: 'DELETE' 
      });
      if (!res.ok) throw new Error('Failed to delete user');
      setDeleteUsername(null);
      setSuccess('User deleted successfully!');
      await fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 8 }}>
      {/* MetLife Logo Header */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <img src="/download.png" alt="MetLife Logo" style={{ maxWidth: 180, maxHeight: 60 }} />
      </Box>
      
      {/* Enhanced Navigation Bar */}
      <Paper elevation={3} sx={{ mb: 3, p: 2, backgroundColor: '#f8f9fa' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            User Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => navigate('/claims')} 
              startIcon={<ArrowBackIcon />}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '14px',
                padding: '8px 16px'
              }}
            >
              Back to Summary
            </Button>
          </Box>
        </Box>
      </Paper>
      
      {/* Add User Section */}
      <Paper sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, color: '#1976d2', fontWeight: 'bold' }}>
          Add New User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
            <TextField 
              label="Username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required
            />
            <TextField 
              label="Password" 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required
            />
          </Box>
          <TextField 
            select 
            label="Role" 
            value={role} 
            onChange={e => setRole(e.target.value)} 
            fullWidth 
            sx={{ mb: 2 }} 
            SelectProps={{ native: true }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </TextField>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={loading}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '16px',
              padding: '10px 24px'
            }}
          >
            {loading ? 'Adding User...' : 'Add User'}
          </Button>
        </form>
      </Paper>

      {/* All Users Section */}
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, color: '#1976d2', fontWeight: 'bold' }}>
          All Users ({users.length})
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Username</TableCell>
                <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Role</TableCell>
                <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map(user => (
                <TableRow key={user.username}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role} 
                      color={user.role === 'admin' ? 'error' : 'primary'} 
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label="Active" 
                      color="success" 
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleEdit(user)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => setDeleteUsername(user.username)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
            />
          </Box>
        )}
      </Paper>

      {/* Edit User Modal */}
      <Dialog open={!!editUser} onClose={() => setEditUser(null)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField 
            label="Username" 
            name="username" 
            value={editData.username || ''} 
            disabled
            fullWidth 
            sx={{ mt: 2 }} 
          />
          <TextField 
            select 
            label="Role" 
            name="role" 
            value={editData.role || ''} 
            onChange={handleEditChange} 
            fullWidth 
            sx={{ mt: 2 }}
            SelectProps={{ native: true }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUser(null)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteUsername} onClose={() => setDeleteUsername(null)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete user "{deleteUsername}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteUsername(null)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AddUser;
