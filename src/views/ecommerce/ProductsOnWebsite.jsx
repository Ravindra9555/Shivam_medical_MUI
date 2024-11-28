import React from 'react'
import ResponsiveAppBar from '../../components/landing/HomeNavbar'
import ProductList from './ProductList'
import { Box } from '@mui/material'

const ProductsOnWebsite = () => {
  return (
    <div>
      <ResponsiveAppBar/>
      <Box sx={{mt:"70px"}}>

      <ProductList/>
      </Box>
    </div>
  )
}

export default ProductsOnWebsite
