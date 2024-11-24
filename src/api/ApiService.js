import axios from 'axios';
import Swal from 'sweetalert2';
// Function to create an Axios instance with custom config
const createAxiosInstance = (baseURL, tokenKey) => {
  const api = axios.create({
    baseURL: baseURL, // Base URL for the API
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add a request interceptor
  api.interceptors.request.use(
    (config) => {
      // Retrieve the token based on the provided tokenKey
      const token = localStorage.getItem(tokenKey);
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor for centralized error handling
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        const status = error.response.status;
        const errorMessage = error?.response?.data?.message || 'An error occurred';

        switch (status) {
          case 401:
            // Handle unauthorized access
            Swal.fire({
              icon: 'error',
              title: 'Unauthorized',
              text: 'Please log in to continue.',
            });
            break;
          case 403:
            Swal.fire({
              icon: 'warning',
              title: 'Access Denied',
              text: 'You do not have permission to perform this action.',
            });
            break;
          case 404:
            Swal.fire({
              icon: 'error',
              title: 'Not Found',
              text: 'The requested resource was not found.',
            });
            break;
          case 500:
            Swal.fire({
              icon: 'error',
              title: 'Server Error',
              text: 'A server error occurred. Please try again later.',
            });
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: errorMessage,
            });
        }
      } else if (error.request) {
        Swal.fire({
          icon: 'error',
          title: 'Network Error',
          text: 'Network error. Please check your connection.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred. Please try again.',
        });
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export default createAxiosInstance;
