import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

const AppointmentTabel = () => {
  const rows = [
    { id: 1, doctor: 'Dr. John Smith', patient: 'John Doe', date: '2022-01-01', time: '10:00 AM', status: 'pending' },
    { id: 2, doctor: 'Dr. Jane Doe', patient: 'Jane Smith', date: '2022-01-02', time: '11:00 AM', status: 'completed' },
    { id: 3, doctor: 'Dr. Bob Johnson', patient: 'Bob Williams', date: '2022-01-03', time: '12:00 PM', status: 'cancelled' },
    { id: 4, doctor: 'Dr. Alice Brown', patient: 'Alice Johnson', date: '2022-01-04', time: '1:00 PM', status: 'pending' },
    { id: 5, doctor: 'Dr. David Lee', patient: 'David Kim', date: '2022-01-05', time: '2:00 PM', status: 'completed' },
  ];

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <TableContainer component={Paper} sx={{ minWidth: 650 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Doctor</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.doctor}
                </TableCell>
                <TableCell>{row.patient}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AppointmentTabel;
