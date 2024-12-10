import React from 'react'
import {
    Box,
    Link,
    Typography,
    
  } from "@mui/material";
  import dayjs from 'dayjs';
const Footer = () => {
    return ( 
        <Box sx={{p:3, textAlign:'center'}}>
            <Typography>© {dayjs().format("YYYY")} All rights reserved by <Link href="https://shivampharmacy.vercel.app">Shivam Medical  </Link> </Typography>
        </Box>
     );
}
 
export default Footer;