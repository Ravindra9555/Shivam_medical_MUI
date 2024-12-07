import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Avatar,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const UserCompleteProfile = () => {
  const [open, setOpen] = useState(true); // Show modal when user logs in
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const { setUser, user } = useUser();

  // Handle profile picture change and preview
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file)); // Create a preview URL
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('profilePic', profilePic);
      formData.append('id', user.id);

      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/v1/api/users/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.status === 200) {
        console.log('Profile updated successfully');
        setUser({
          id: res.data.data._id,
          email: res.data.data.email,
          profilePic: res.data.data.profilePic,
          name: res.data.data.name,
          role: res.data.data.role,
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setOpen(false); // Close dialog after submission
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>
        Complete Your Profile
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" noValidate sx={{ mt: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Box display="flex" gap={3} alignItems="center">
            <Button variant="contained" component="label">
              Upload Profile Picture
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleProfilePicChange}
              />
            </Button>
            {preview && (
              <Avatar
                src={preview}
                alt="Profile Preview"
                sx={{ width: 100, height: 100 }}
              />
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="secondary">
          Close
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserCompleteProfile;
