
import React, { useState } from 'react';
import { TextField, Button, Card, Container, Grid, Alert, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Password matching validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      // Make a POST request to update the password
      const response = await axios.post(`${import.meta.env.VITE_BASEURL}/v1/api/users/changepassword`, {
        password: formData.password,
        resetToken: resetToken,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
        }).then(() => {
          navigate('/');
        });
      }

      // Handle success response
      setSuccess('Your password has been reset successfully.');
      setFormData({ password: '', confirmPassword: '' });
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card sx={{ padding: 3, boxShadow: 3 }} size="md">
            <Typography variant="h6" gutterBottom>
              Reset Password
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField
               size='small'
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                helperText="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
              />

              <TextField
                label="Confirm Password"
                type="password"
                size='small'

                fullWidth
                margin="normal"
                variant="outlined"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                minLength={6}
              />

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ marginTop: 3 }}
                disabled={loading}
              >
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </Button>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResetPassword;
