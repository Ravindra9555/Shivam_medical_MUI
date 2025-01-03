import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box ,Typography} from '@mui/material';
import { cyan, lightBlue } from '@mui/material/colors';
import  dayjs  from 'dayjs';

const AppointmentTabel = ({data}) => {
  return (
    <Box sx={{ overflowX: 'auto',
     }} >
      <Typography variant="h5" p={1} gutterBottom>
        Upcoming Appointments
      </Typography>
      <TableContainer component={Paper} sx={{ minWidth: 650 }}>
        <Table aria-label="simple table"  bgcolor={cyan[50]} >
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
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.doctorId?.name}
                </TableCell>
                <TableCell>{row.patientId?.name}</TableCell>
                <TableCell>{dayjs(row.date).format('DD/MM/YYYY')}</TableCell>
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
