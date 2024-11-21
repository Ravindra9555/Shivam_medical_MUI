import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Grid, Select, MenuItem, FormControl, InputLabel, Button, Box } from "@mui/material";

const ProductSearchAndFilter = () => {
    const medicineTypes = ["Tablet", "Capsule", "Syrup", "Injection", "Cream"];
    const categories = ["Allopathy", "Unani", "Ayurveda", "Homeopathy", "Herbal"];

  return (
    <Box sx={{ bgcolor:"paper",p:2, boxShadow:2, borderRadius:2  }} >

    <Grid container spacing={2} >
      <Grid item xs={12} sm={6} md={3}>
        <Autocomplete
        size="small"
          id="free-solo-demo"
          freeSolo
          options={top100Films.map((option) => option.title)}
          renderInput={(params) => (
            <TextField {...params}  size="small"label="Search by Title" />
          )}
        />
      </Grid>
      {/* Medicine Type Select Field */}
      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel  size="small" id="medicine-type-label">Medicine Type</InputLabel>
          <Select
            labelId="medicine-type-label"
             size="small"
            id="medicine-type"
            label="Medicine Type"
            defaultValue=""
          >
            {medicineTypes.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel  size="small" id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            label="Category"
             size="small"
            defaultValue=""
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
         <Button variant="contained"  fullWidth color="primary"> Apply Filter</Button>
      </Grid>
    </Grid>
    </Box>
  );
};

export default ProductSearchAndFilter;

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];
