import createAxiosInstance from './apiService';

// Create Axios instance for admin with 'admintoken'
const adminApi = createAxiosInstance(process.env.REACT_APP_BASEURL, 'adminToken');

// Example Admin API functions
const adminService = {
  getAdminDashboard: () => adminApi.get('/dashboard'),
  manageUsers: (data) => adminApi.post('/users/manage', data),
  uploadAdminFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return adminApi.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  // Add more admin-specific APIs here
};

export default adminService;
