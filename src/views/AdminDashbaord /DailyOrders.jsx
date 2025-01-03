import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import { cyan, orange } from '@mui/material/colors';

const DailyOrders = ({ data }) => {
  return (
    <Box sx={{ bgcolor: orange[50], p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Daily Orders
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 400, overflowX: 'auto' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>SN</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Order Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((order,i) => (
              <TableRow key={i}>
                <TableCell>{i+1}</TableCell>
                <TableCell>{order?.address?.fullName}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                <TableCell>Rs. {order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>{order.paymentStatus}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DailyOrders;
