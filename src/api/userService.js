import createAxiosInstance from './ApiClient';

// Create Axios instance for user with 'usertoken'
const userApi = createAxiosInstance( process.env.REACT_APP_BASEURL, 'userToken');

// Example User API functions
const userService = {
  userLogin : (data)=> userApi.post('/v1/api/users/login', data),
  resetLink :( data)=> userApi.post("/v1/api/users/resetlink", data),
 
  // Add more user-specific APIs here
};

export default userService;
