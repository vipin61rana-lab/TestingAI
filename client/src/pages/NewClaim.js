import React, { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, Typography, TextField, MenuItem, Paper, Chip } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const steps = ['Client Info', 'Claim Details', 'Review', 'Submit'];

const initialClientInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
};
const initialClaimDetails = {
  policyNumber: '',
  claimType: '',
  dateOfIncident: '',
  description: ''
};

function NewClaim() {
  const [activeStep, setActiveStep] = useState(0);
  const [clientInfo, setClientInfo] = useState(initialClientInfo);
  const [claimDetails, setClaimDetails] = useState(initialClaimDetails);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validateClientInfo = () => {
    const errors = {};
    
    if (!clientInfo.firstName.trim()) {
      errors.firstName = 'First Name is required';
    }
    
    if (!clientInfo.lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }
    
    if (!clientInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(clientInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!clientInfo.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!validatePhone(clientInfo.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateClaimDetails = () => {
    const errors = {};
    
    if (!claimDetails.policyNumber.trim()) {
      errors.policyNumber = 'Policy Number is required';
    }
    
    if (!claimDetails.claimType) {
      errors.claimType = 'Claim Type is required';
    }
    
    if (!claimDetails.dateOfIncident) {
      errors.dateOfIncident = 'Date of Incident is required';
    }
    
    if (!claimDetails.description.trim()) {
      errors.description = 'Description is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateClientInfo()) {
      return;
    }
    if (activeStep === 1 && !validateClaimDetails()) {
      return;
    }
    setValidationErrors({});
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setValidationErrors({});
    setActiveStep(prev => prev - 1);
  };

  const handleClientChange = e => {
    setClientInfo({ ...clientInfo, [e.target.name]: e.target.value });
  };
  const handleClaimChange = e => {
    setClaimDetails({ ...claimDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientInfo, claimDetails })
      });
      if (!res.ok) throw new Error('Failed to submit claim');
      setSubmitting(false);
      navigate('/claims');
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      {/* MetLife Logo Header */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <img src="/download.png" alt="MetLife Logo" style={{ maxWidth: 180, maxHeight: 60 }} />
      </Box>
      
      {/* Enhanced Navigation Bar */}
      <Paper elevation={3} sx={{ mb: 3, p: 2, backgroundColor: '#f8f9fa' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            New Claim
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
      
      <Paper sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && (
          <Box>
            <Typography variant="h6">Client Info</Typography>
            <TextField 
              label="First Name" 
              name="firstName" 
              value={clientInfo.firstName} 
              onChange={handleClientChange} 
              fullWidth 
              required
              error={!!validationErrors.firstName}
              helperText={validationErrors.firstName}
              sx={{ mt: 2 }} 
            />
            <TextField 
              label="Last Name" 
              name="lastName" 
              value={clientInfo.lastName} 
              onChange={handleClientChange} 
              fullWidth 
              required
              error={!!validationErrors.lastName}
              helperText={validationErrors.lastName}
              sx={{ mt: 2 }} 
            />
            <TextField 
              label="Email" 
              name="email" 
              type="email"
              value={clientInfo.email} 
              onChange={handleClientChange} 
              fullWidth 
              required
              error={!!validationErrors.email}
              helperText={validationErrors.email}
              sx={{ mt: 2 }} 
            />
            <TextField 
              label="Phone" 
              name="phone" 
              value={clientInfo.phone} 
              onChange={handleClientChange} 
              fullWidth 
              required
              error={!!validationErrors.phone}
              helperText={validationErrors.phone}
              placeholder="e.g., 123-456-7890"
              sx={{ mt: 2 }} 
            />
          </Box>
        )}
        {activeStep === 1 && (
          <Box>
            <Typography variant="h6">Claim Details</Typography>
            <TextField 
              label="Policy Number" 
              name="policyNumber" 
              value={claimDetails.policyNumber} 
              onChange={handleClaimChange} 
              fullWidth 
              required
              error={!!validationErrors.policyNumber}
              helperText={validationErrors.policyNumber}
              sx={{ mt: 2 }} 
            />
            <TextField 
              select 
              label="Claim Type" 
              name="claimType" 
              value={claimDetails.claimType} 
              onChange={handleClaimChange} 
              fullWidth 
              required
              error={!!validationErrors.claimType}
              helperText={validationErrors.claimType}
              sx={{ mt: 2 }}
            >
              <MenuItem value="">Select Claim Type</MenuItem>
              <MenuItem value="Auto">Auto</MenuItem>
              <MenuItem value="Home">Home</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
              <MenuItem value="Life">Life</MenuItem>
            </TextField>
            <TextField 
              type="date" 
              label="Date of Incident" 
              name="dateOfIncident" 
              value={claimDetails.dateOfIncident} 
              onChange={handleClaimChange} 
              fullWidth 
              required
              error={!!validationErrors.dateOfIncident}
              helperText={validationErrors.dateOfIncident}
              InputLabelProps={{ shrink: true }} 
              sx={{ mt: 2 }} 
            />
            <TextField 
              label="Description" 
              name="description" 
              value={claimDetails.description} 
              onChange={handleClaimChange} 
              fullWidth 
              required
              multiline 
              rows={3} 
              error={!!validationErrors.description}
              helperText={validationErrors.description}
              placeholder="Please describe the incident in detail..."
              sx={{ mt: 2 }} 
            />
          </Box>
        )}
        {activeStep === 2 && (
          <Box>
            <Typography variant="h6">Review</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography><b>First Name:</b> {clientInfo.firstName}</Typography>
              <Typography><b>Last Name:</b> {clientInfo.lastName}</Typography>
              <Typography><b>Email:</b> {clientInfo.email}</Typography>
              <Typography><b>Phone:</b> {clientInfo.phone}</Typography>
              <Typography><b>Policy Number:</b> {claimDetails.policyNumber}</Typography>
              <Typography><b>Claim Type:</b> {claimDetails.claimType}</Typography>
              <Typography><b>Date of Incident:</b> {claimDetails.dateOfIncident}</Typography>
              <Typography><b>Description:</b> {claimDetails.description}</Typography>
            </Box>
          </Box>
        )}
        {activeStep === 3 && (
          <Box>
            <Typography variant="h6">Submit</Typography>
            <Typography sx={{ mt: 2 }}>Click submit to file your claim.</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={submitting} sx={{ mt: 2 }}>
              {submitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>
        )}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
          {activeStep < steps.length - 1 && (
            <Button variant="contained" onClick={handleNext}>Next</Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default NewClaim;
