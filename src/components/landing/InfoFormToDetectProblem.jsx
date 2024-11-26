import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  Container,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Card,
  CardContent,
} from "@mui/material";
import userService from "../../api/userService";
import Swal from "sweetalert2";
import Spinner from "../../views/Spinner/Spinner.js";
const InfoFormToDetectProblem = () => {
  const [formData, setFormData] = React.useState({
    age: "",
    gender: "",
    medicalHistory: "",
    medications: "",
    lifestyleFactors: "",
    symptoms: "",
  });
  const [response, setResponse] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await userService.generateAiResult(formData);
      if (res.status == 200) {
        setResponse(res.data.data.response.candidates[0].content.parts[0].text);
         setFormData({
            age: "",
            gender: "",
            medicalHistory: "",
            medications: "",
            lifestyleFactors: "",
            symptoms: "",
          });
      
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to fetch data.",
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 4, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Detect Problem & Suggest Medicine
      </Typography>
      <Typography variant="body1" paragraph>
        Please provide your age, gender, medical history, medications, lifestyle
        factors, and symptoms.
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ borderRadius: 2, boxShadow: 3, mt: 3, p: 2 }}
      >
        <Grid item xs={12} md={6}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  id="age"
                  name="age"
                  label="Age (in years)"
                  variant="outlined"
                  value={formData.age}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <FormControl
                  sx={{ display: "flex" }}
                  size="small"
                  component="fieldset"
                  fullWidth
                >
                  <FormLabel size="small" component="legend">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    size="small"
                    row
                    aria-label="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      size="small"
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      size="small"
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  id="medicalHistory"
                  name="medicalHistory"
                  label="Medical History"
                  variant="outlined"
                  placeholder="Medical History (e.g., diabetes, heart disease, allergies)"
                  multiline
                  rows={3}
                  value={formData.medicalHistory}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  id="medications"
                  name="medications"
                  label="Medications"
                  placeholder="Medications (e.g., names, dosages, frequencies)"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={formData.medications}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  id="lifestyleFactors"
                  name="lifestyleFactors"
                  label="Lifestyle Factors"
                  variant="outlined"
                  placeholder="Lifestyle Factors (e.g., diet, exercise, smoking, alcohol)"
                  multiline
                  rows={3}
                  value={formData.lifestyleFactors}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  id="symptoms"
                  size="small"
                  name="symptoms"
                  label="Symptoms"
                  variant="outlined"
                  placeholder="  Symptoms (e.g., pain, fever, cough, difficulty breathing)"
                  multiline
                  rows={3}
                  value={formData.symptoms}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ py: 1.5 }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" color="error" gutterBottom>
              Note: This information will be used to generate a diagnostic
              report and may be shared with AI models. Please be aware that the
              generated information may not be 100% accurate, so use it with
              caution.
            </Typography>
            <Card sx={{ mt: 2, bgcolor: "paper" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  AI Response
                </Typography>
                <Typography variant="body1">
                  {loading ? <Box sx={{maxHeight:"200px", display:"flex", alignItems:"center"}}><Typography color={"yellowgreen"}>Loading .... </Typography></Box>: response}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InfoFormToDetectProblem;
