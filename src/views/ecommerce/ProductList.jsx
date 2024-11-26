
import React, { useState, useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import ResponsiveAppBar from "../../components/landing/HomeNavbar";
import ProductSearchAndFilter from "./ProductSearchAndFilter";
import Cart from "./Cart";
import ProductCard from "./ProductCard";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import userService from "../../api/userService";
import Swal from "sweetalert2";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Fetch products whenever the page number changes
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (currentPage) => {
    setLoading(true);
    try {
  
      const res = await userService.getAllListedProducts({ page: currentPage });
      if (res.status === 200) {
        setProducts(res.data.data.products);
        setTotalPages(res.data.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value); // Update the page number with the selected value
  };

  const handleSearch = async(query) => {
    try {
       const res = await userService.searchProduct( query);
        if(res.status==200){
          setProducts(res.data.data);
          // setTotalPages(res.data.data.pagination.totalPages);
        }
    } catch (error) {
      console.error("Error searching products:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to search products.",
      })
    }
  };

  const handleFilter = async(medicineType, category) => {
    try {
       const res = await userService.filterProduct({type:medicineType, category:category});
        if(res.status==200){
          setProducts(res.data.data.products);
          setTotalPages(res.data.data.pagination.totalPages);
        }

    } catch (error) {
      console.error("Error filtering products:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to filter products.",
      })
        
    }
  };
 
  return (
    <div>
      <ResponsiveAppBar />
      <Box sx={{ paddingTop: "70px" }}>
        <Container>
          <Grid container spacing={3} justifyContent="center" p={2}>
            <Grid item xs={12} sm={12} md={12}>
              <ProductSearchAndFilter 
            onSearch={handleSearch}
            onFilter={handleFilter}
            listAll={()=>fetchProducts(1)}
          />
            </Grid>
          </Grid>
          <Grid container spacing={3} display={"flex"} justifyContent="center">
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={3} key={product._id || index}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          {loading && <Box sx={{ textAlign: "center", py: 2 }}>Loading...</Box>}

          <Box sx={{ borderRadius: 3, boxShadow: 3, p: 2, display: "flex", justifyContent: "center" }}>
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                color="secondary"
                showFirstButton
                showLastButton
                page={page} // Ensure that the current page is reflected in the pagination
                onChange={handlePageChange} // Corrected handler
              />
            </Stack>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default ProductList;
