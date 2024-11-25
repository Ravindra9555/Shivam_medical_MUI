import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import adminService from "../../api/adminService";
import Swal from "sweetalert2";
import { Visibility } from "@mui/icons-material";

const AllProductList = () => {
  const [products, setProducts] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // Start at the first page
    pageSize: 5, // Default page size
  });
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, [paginationModel]);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const { page, pageSize } = paginationModel;
      const res = await adminService.getAllProducts({
        page: page + 1, // Convert to 1-based index for backend
        limit: pageSize,
      });

      if (res.status === 200) {
        const data = res.data.data.products;
        const mappedData = data.map((product) => ({
          id: product._id,
          productName: product.name,
          productType: product.type,
          productMRP: product.mrp,
          productDiscount: product.discount,
          productPriceAfterDiscount: product.priceAfterDiscount,
          productImage: product.image,
          productQuantity: product.quantity,
          isVisible: product.isListed,
        }));

        setProducts(mappedData);
        setTotalProducts(res.data.data.pagination.totalProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      field: "productName",
      headerName: "Product Name",
      flex: 1,
    },
    {
      field: "productType",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "productMRP",
      headerName: "MRP",
      flex: 1,
    },
    {
      field: "productDiscount",
      headerName: "Discount (%)",
      flex: 1,
    },
    {
      field: "productPriceAfterDiscount",
      headerName: "Price After Discount",
      flex: 1,
    },
    {
      field: "productImage",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Product"
          style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 5 }}
        />
      ),
    },
    {
      field: "productQuantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <div>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => handleEdit(params.row.id)}
              color="primary"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => handleDelete(params.row.id)}
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={params.row.isVisible ? "Unlist from website":"List on website"}>
            {
               params.row.isVisible ?  <IconButton
               onClick={() => handleUnlist(params.row.id)}
               color="error"
             >
               <VisibilityOffIcon />
             </IconButton > : <IconButton
              onClick={() => handleUnlist(params.row.id)}
              color="success">
               <Visibility />
             </IconButton>

            }
          
          </Tooltip>
        </div>
      ),
    },
  ];
 // Handlers for actions (implement your logic here)
 const handleEdit = (id) => {
  console.log("Edit product with id:", id);
  // Implement edit logic
};

const handleDelete = async(id) => {
   try {
     const res = await adminService.deleteProduct({productId:id});
     if (res.status === 200) {
       // Refresh the products list
       Swal.fire({
         icon: "success",
         title: "Success",
         text: res.data.message,
         timer: 1500,
       })
       fetchAllProducts();
     } 
    
   } catch (error) {
     console.error("Error deleting product:", error);
     Swal.fire({
       icon: "error",
       title: "Error",
       text: error.response?.data?.message,
     });
    
   }
};

const handleUnlist = async(id) => {
   try {
     const res = await adminService.listAndUnlistProduct({productId:id});
     if (res.status === 200) {
       // Refresh the products list
       Swal.fire({
         icon: "success",
         title: "Success",
         text: res.data.message,
         timer: 1500,
       })
       fetchAllProducts();
     }
    
   } catch (error) {
     console.error("Error unlisting product:", error);
     Swal.fire({
       icon: "error",
       title: "Error",
       text: error.response?.data?.message,
     });
    
   }
};

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={products}
        columns={columns}
        loading={loading}
        pagination
        paginationMode="server" // Server-side pagination
        rowCount={totalProducts} // Total number of rows
        paginationModel={paginationModel} // Controlled pagination model
        onPaginationModelChange={setPaginationModel} // Update state on pagination change
      />
    </div>
  );
};

export default AllProductList;
