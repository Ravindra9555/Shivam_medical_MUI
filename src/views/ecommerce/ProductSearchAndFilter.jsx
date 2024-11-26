import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";

const ProductSearchAndFilter = ({ onSearch, onFilter, listAll }) => {
  const [searchTerm, setSearchTerm] = useState(""); // For search input
  const [selectedMedicineType, setSelectedMedicineType] = useState(""); // For medicine type filter
  const [selectedCategory, setSelectedCategory] = useState(""); // For category filter

  const medicineTypes = ["Tablet", "Capsule", "Syrup", "Injection", "Cream"];
  const categories = ["Allopathy", "Unani", "Ayurveda", "Homeopathy", "Herbal"];

  // Use useRef to store the timeout reference
  const debounceTimer = useRef(null);

  // Handle the search input change with debounce
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Clear the previous timeout
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set a new timeout to delay the search action
    debounceTimer.current = setTimeout(() => {
      onSearch(value); // Trigger search with the value after 3 seconds
    }, 1500); // 3000ms = 3 seconds
  };

  // Handle filter changes
  const handleMedicineTypeChange = (event) => {
    setSelectedMedicineType(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Handle the filter button click
  const handleApplyFilters = () => {
    onFilter(selectedMedicineType, selectedCategory); // Trigger filter application
  };

  return (
    <Box sx={{ bgcolor: "paper", p: 2, boxShadow: 2, borderRadius: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Autocomplete
            size="small"
            id="search-title"
            freeSolo
            value={searchTerm}
            onChange={(e, newValue) => setSearchTerm(newValue)} // Handle autocomplete input change
            options={[]}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Search Medicine ....."
                onChange={handleSearchChange} // Handle search input with debounce
              />
            )}
          />
        </Grid>

        {/* Medicine Type Select Field */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel size="small" id="medicine-type-label">
              Medicine Type
            </InputLabel>
            <Select
              labelId="medicine-type-label"
              size="small"
              id="medicine-type"
              label="Medicine Type"
              value={selectedMedicineType}
              onChange={handleMedicineTypeChange} // Handle selection change
            >
              {medicineTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Category Select Field */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel size="small" id="category-label">
              Category
            </InputLabel>
            <Select
              labelId="category-label"
              id="category"
              label="Category"
              size="small"
              value={selectedCategory}
              onChange={handleCategoryChange} // Handle selection change
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Apply Filter Button */}
        <Grid item xs={12} sm={6} md={3} display={"flex"} >
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleApplyFilters} // Trigger filter and search
          >
            Apply Filter
          </Button>
          {/* clear filter button */}
          <Button
            variant="contained"
            fullWidth
            sx={{ml:2}}
            color="error"
            onClick={() => {
              setSelectedMedicineType("");
              setSelectedCategory("");
              setSearchTerm("");
              listAll();
               // Trigger search with empty value to clear search results and filters
            }}
            >
            Clear Filter
            </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductSearchAndFilter;
