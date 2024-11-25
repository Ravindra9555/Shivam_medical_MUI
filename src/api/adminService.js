import createAxiosInstance from "./ApiClient";

// Create Axios instance for admin with 'admintoken'
const adminApi = createAxiosInstance(
  process.env.REACT_APP_BASEURL,
  "adminToken"
);

// Example Admin API functions
const adminService = {
  addproduct: (data) =>
    adminApi.post("/v1/api/product/addproduct", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  getAllProducts: (data) => adminApi.post("/v1/api/product/allproducts", data),
  getAllListedProducts: (data) =>
    adminApi.post("/v1/api/product/allproductsListed", data),
  searchproductByName: (data) => adminApi.get(`/v1/api/product/search/${data}`),
  listAndUnlistProduct: (data) =>
    adminApi.post("/v1/api/product/unlistproduct", data),
  updateProduct: (data) =>
    adminApi.post("/v1/api/product/updateproduct", data, {
      headers: {
        multipart: true,
      },
    }),

  deleteProduct: (data) => adminApi.post("/v1/api/product/deleteproduct", data),
  filterProduct: (data) =>
    adminApi.get("/v1/api/product/updateproduct", {
      params: {
        data,
      },
    }),

  // Add more admin-specific APIs here
};

export default adminService;
