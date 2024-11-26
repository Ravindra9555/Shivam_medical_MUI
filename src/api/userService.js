import createAxiosInstance from "./ApiClient";

// Create Axios instance for user with 'usertoken'
const userApi = createAxiosInstance(process.env.REACT_APP_BASEURL, "userToken");

// Example User API functions
const userService = {
  userLogin: (data) => userApi.post("/v1/api/users/login", data),
  resetLink: (data) => userApi.post("/v1/api/users/resetlink", data),
  generateAiResult: (data) =>
    userApi.post("/v1/api/googleai/generateMedicalReport", data),
  // Add more user-specific APIs here

  //  ecommerce
  getAllListedProducts: (data) =>
    userApi.post("/v1/api/product/allproductsListed", data),
  filterProduct: (data) =>
    userApi.get("/v1/api/product/filterproduct", {
      params: data,
    }),
  searchProduct: (data) => userApi.get(`/v1/api/product/search/${data}`),
 

};

export default userService;
