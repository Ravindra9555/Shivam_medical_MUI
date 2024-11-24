import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const AllProductList = () => {
  // Sample data, replace this with your API data
  const products = [
    {
      id: 1,
      productName: 'Product 1',
      productType: 'Type A',
      productMRP: 100,
      productDiscount: 10,
      productPriceAfterDiscount: 90,
      productImage: 'https://via.placeholder.com/100',
      productQuantity: 50,
    },
    {
      id: 2,
      productName: 'Product 2',
      productType: 'Type B',
      productMRP: 200,
      productDiscount: 15,
      productPriceAfterDiscount: 170,
      productImage: 'https://via.placeholder.com/100',
      productQuantity: 30,
    },
    // Add more products here
  ];

  // Define columns for DataGrid
  const columns = [
    {
      field: 'productName',
      headerName: 'Product Name',
      flex: 1,
    },
    {
      field: 'productType',
      headerName: 'Type',
      flex: 1,
    },
    {
      field: 'productMRP',
      headerName: 'MRP',
      flex: 1,
      
    },
    {
      field: 'productDiscount',
      headerName: 'Discount (%)',
      flex: 1,
    },
    {
      field: 'productPriceAfterDiscount',
      headerName: 'Price After Discount',
      flex: 1,
    },
    {
      field: 'productImage',
      headerName: 'Image',
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Product"
          style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 5 }}
        />
      ),
    },
    {
      field: 'productQuantity',
      headerName: 'Quantity',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <div>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row.id)} color="primary">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Unlist from Website">
            <IconButton onClick={() => handleUnlist(params.row.id)} color="default">
              <VisibilityOffIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  // Handlers for actions (implement your logic here)
  const handleEdit = (id) => {
    console.log('Edit product with id:', id);
    // Implement edit logic
  };

  const handleDelete = (id) => {
    console.log('Delete product with id:', id);
    // Implement delete logic
  };

  const handleUnlist = (id) => {
    console.log('Unlist product with id:', id);
    // Implement unlist logic
  };

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default AllProductList;
