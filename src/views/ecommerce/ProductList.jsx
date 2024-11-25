// import React from "react";

// import user1 from "../../assets/images/products/med1.jpg";
// import user2 from "../../assets/images/products/med3.jpg";
// import user3 from "../../assets/images/products/med2.jpg";
// import user4 from "../../assets/images/products/med4.jpg";
// import ProductCard from "./ProductCard";
// import { Box, Container, Grid } from "@mui/material";
// import ResponsiveAppBar from "../../components/landing/HomeNavbar";
// import ProductSearchAndFilter from "./ProductSearchAndFilter";
// import Cart from "./Cart";


// const products = [
//   {
//     id: "1",
//     img: user1,
//     title: "Paracetamol ",
//     subtitle:
//       "10 Tablet ",
//     btncolor: "error",
//     mrp:"200",
//     discount:'10',
//     price:"180"
//   },
//   {
//     id: "2",
//     img: user2,
//     title: "RD Tablet",
//     subtitle:
//       " 15 tablets",
//     btncolor: "warning",
//     mrp:"300",
//     discount:'10',
//     price:"187"
//   },
//   {
//     id: "3",
//     img: user3,
//     title: "RX Plus Capsule",
//     subtitle:
//       "15 capsule per strip",
//     btncolor: "primary",
//     mrp:"200",
//     discount:'10',
//     price:"180"
//   },
//   {
//     id: "4",
//     img: user4,
//     title: "RX Plus Capsule",
//     subtitle:
//       "15 capsule per strip",
//     btncolor: "primary",
//     mrp:"200",
//     discount:'10',
//     price:"180"
//   },
// ];

// const ProductList = () => {
//   return (
//     <div>
//       <ResponsiveAppBar />
//       <Box sx={{ paddingTop: "70px" }}>
//         <Container>
//           <Grid container spacing={3} justifyContent="center" p={2}>
//             <Grid item xs={12} sm={12} md={12}>
//               <ProductSearchAndFilter />
//             </Grid>
//           </Grid>
//           <Grid container spacing={3} display={"flex"} justifyContent="center">
//             {products.map((product, index) => (
//               <Grid item xs={12} sm={6} md={3} key={index}>
//                 <ProductCard product={product} />
//               </Grid>
//             ))}
//           </Grid>
//           <Cart/>

//         </Container>
//       </Box>
//     </div>
//   );
// };

// export default ProductList;
import React, { useState, useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import ResponsiveAppBar from "../../components/landing/HomeNavbar";
import ProductSearchAndFilter from "./ProductSearchAndFilter";
import Cart from "./Cart";
import ProductCard from "./ProductCard";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch products whenever the page number changes
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (currentPage) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `http://127.0.0.1:8081/v1/api/product/allproductsListed`,{page: currentPage}
      );

      if (res.data.success) {
        const newProducts = res.data.data.products;

        // Add new products to the existing list
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);

        // Check if there are more pages to load
        const { currentPage, totalPages } = res.data.data.pagination;
        setHasMore(currentPage < totalPages);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (hasMore && !loading) {
        setPage((prevPage) => prevPage + 1); // Load next page
      }
    }
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, loading]);

  return (
    <div>
      <ResponsiveAppBar />
      <Box sx={{ paddingTop: "70px" }}>
        <Container>
          <Grid container spacing={3} justifyContent="center" p={2}>
            <Grid item xs={12} sm={12} md={12}>
              <ProductSearchAndFilter />
            </Grid>
          </Grid>
          <Grid container spacing={3} display={"flex"} justifyContent="center">
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={3} key={product._id || index}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          {loading && (
            <Box sx={{ textAlign: "center", py: 2 }}>Loading...</Box>
          )}
          {!hasMore && (
            <Box sx={{ textAlign: "center", py: 2 }}>No more products</Box>
          )}
         
        </Container>
      </Box>
    </div>
  );
};

export default ProductList;
