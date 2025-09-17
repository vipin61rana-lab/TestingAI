import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function AddUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

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
      await fetchUsers();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Add New User</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth sx={{ mb: 2 }} />
          <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth sx={{ mb: 2 }} />
          <TextField select label="Role" value={role} onChange={e => setRole(e.target.value)} fullWidth sx={{ mb: 2 }} SelectProps={{ native: true }}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </TextField>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? 'Adding...' : 'Add User'}
          </Button>
        </form>
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>All Users</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Role</TableCell>
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
      </Paper>
    </Box>
  );
}

export default AddUser;
