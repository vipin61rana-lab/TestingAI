import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:4000/api/users');
    const data = await res.json();
    setUsers(data);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8 }}>
      {/* MetLife Logo Header */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <img src="/download.png" alt="MetLife Logo" style={{ maxWidth: 180, maxHeight: 60 }} />
      </Box>
      
      {/* Enhanced Navigation Bar */}
      <Paper elevation={3} sx={{ mb: 3, p: 2, backgroundColor: '#f8f9fa' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            All Users
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
      
      <Paper sx={{ p: 4 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Username</TableCell>
                <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.username}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => navigate('/claims')}>
          Go to Summary
        </Button>
      </Paper>
    </Box>
  );
}

export default AdminUsers;
