import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'

const dummyOrders = [
  {
    _id: '1',
    user: { name: 'John Doe' },
    createdAt: new Date(),
    totalPrice: 100.99,
    paymentStatus: 'Paid',
    status: 'Delivered',
  },
  {
    _id: '2',
    user: { name: 'Jane Doe' },
    createdAt: new Date('2022-01-01'),
    totalPrice: 50.99,
    paymentStatus: 'Pending',
    status: 'Processing',
  },
  {
    _id: '3',
    user: { name: 'Bob Smith' },
    createdAt: new Date('2022-01-05'),
    totalPrice: 200.99,
    paymentStatus: 'Paid',
    status: 'Delivered',
  },
  {
    _id: '4',
    user: { name: 'Alice Johnson' },
    createdAt: new Date('2022-01-10'),
    totalPrice: 150.99,
    paymentStatus: 'Pending',
    status: 'Processing',
  },
  {
    _id: '5',
    user: { name: 'Mike Brown' },
    createdAt: new Date('2022-01-15'),
    totalPrice: 250.99,
    paymentStatus: 'Paid',
    status: 'Delivered',
  },
]

const DailyOrders = () => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Latest 10 Orders
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell>Order Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyOrders.map(order => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.user.name}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
              <TableCell>Rs. {order.totalPrice.toFixed(2)}</TableCell>
              <TableCell>{order.paymentStatus}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default DailyOrders
