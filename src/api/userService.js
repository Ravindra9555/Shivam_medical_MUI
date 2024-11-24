import createAxiosInstance from './ApiService';

// Create Axios instance for user with 'usertoken'
const userApi = createAxiosInstance( process.env.REACT_APP_BASEURL, 'userToken');

// Example User API functions
const userService = {
  userLogin : (data)=> userApi.post('/v1/api/users/login', data),
  resetLink :( data)=> userApi.post("/v1/api/users/resetlink", data),
  userSignin : (data)=> userApi.post(),
  getUserProfile: () => userApi.get('/profile'),
  updateUserProfile: (data) => userApi.put('/profile', data),
  uploadUserFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return userApi.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  // Add more user-specific APIs here
};

export default userService;
