import React, { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, Typography, TextField, MenuItem, Paper } from '@mui/material';
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
  const navigate = useNavigate();

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);

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
            <TextField label="First Name" name="firstName" value={clientInfo.firstName} onChange={handleClientChange} fullWidth sx={{ mt: 2 }} />
            <TextField label="Last Name" name="lastName" value={clientInfo.lastName} onChange={handleClientChange} fullWidth sx={{ mt: 2 }} />
            <TextField label="Email" name="email" value={clientInfo.email} onChange={handleClientChange} fullWidth sx={{ mt: 2 }} />
            <TextField label="Phone" name="phone" value={clientInfo.phone} onChange={handleClientChange} fullWidth sx={{ mt: 2 }} />
          </Box>
        )}
        {activeStep === 1 && (
          <Box>
            <Typography variant="h6">Claim Details</Typography>
            <TextField label="Policy Number" name="policyNumber" value={claimDetails.policyNumber} onChange={handleClaimChange} fullWidth sx={{ mt: 2 }} />
            <TextField select label="Claim Type" name="claimType" value={claimDetails.claimType} onChange={handleClaimChange} fullWidth sx={{ mt: 2 }}>
              <MenuItem value="Auto">Auto</MenuItem>
              <MenuItem value="Home">Home</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
            </TextField>
            <TextField type="date" label="Date of Incident" name="dateOfIncident" value={claimDetails.dateOfIncident} onChange={handleClaimChange} fullWidth sx={{ mt: 2 }} InputLabelProps={{ shrink: true }} />
            <TextField label="Description" name="description" value={claimDetails.description} onChange={handleClaimChange} fullWidth multiline rows={3} sx={{ mt: 2 }} />
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
