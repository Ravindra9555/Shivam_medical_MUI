// import React from 'react';
// import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
// import { BsFillTelephoneFill, BsFillGeoAltFill, BsFillEnvelopeFill } from 'react-icons/bs';
// import Swal from 'sweetalert2'; // Use Swal for alerts
// import axios from 'axios';

// const Contact = () => {
//   const [formData, setFormData] = React.useState({
//     firstName: '',
//     lastName: '',
//     phone: '',
//     email: '',
//     message: '',
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault(); // Prevent form from refreshing
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_BASEURL}/v1/api/contact/contact`, formData);
//       if (response.status === 200) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Message sent successfully.',
//         });
//         setFormData({
//           firstName: '',
//           lastName: '',
//           phone: '',
//           email: '',
//           message: '',
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to send message. Please try again.',
//       });
//       console.log(error);
//     }
//   };

//   return (
//     <Container className="contact-us-section " id="contact">
//       {/* Contact Form Section */}
//       <Row className="align-items-center" data-aos="fade-up">
//         <Col md={6}>
//           <h2>Get in Touch</h2>
//           <p>Have questions or need more information? Fill out the form below, and we will get back to you as soon as possible.</p>
//           <Form className='border rounded p-2' onSubmit={submitHandler}>
//             <Row>
//               <Col md={6} className="mb-3">
//                 <Form.Group controlId="formName">
//                   <Form.Label>First Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Your Name"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange} // Add onChange handler
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6} className="mb-3">
//                 <Form.Group controlId="formLastName">
//                   <Form.Label>Last Name</Form.Label>
//                   <Form.Control
//                     placeholder='Last Name'
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange} // Add onChange handler
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Row>
//               <Col md={12} className="mb-3">
//                 <Form.Group controlId="formPhone">
//                   <Form.Label>Phone</Form.Label>
//                   <Form.Control
//                     type="tel"
//                     placeholder="Your Phone Number"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange} // Add onChange handler
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={12} className="mb-3">
//                 <Form.Group controlId="formEmail">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Your Email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange} // Add onChange handler
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={12} className="mb-3">
//                 <Form.Group controlId="formMessage">
//                   <Form.Label>Message</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     placeholder="Your Message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange} // Add onChange handler
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Button variant="primary" type="submit">
//               Send Message
//             </Button>
//           </Form>
//         </Col>

//         {/* Map and Contact Info Section */}
//         <Col md={6}>
//           <Card>
//             <Card.Body>
//               <Card.Title>
//                 <BsFillGeoAltFill className="icon" /> Address
//               </Card.Title>
//               <Card.Text>Kakrahwa Bazar, Uttar Pradesh (272206)</Card.Text>
//               <div className="map-iframe">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221.3697493601068!2d83.2157607823993!3d27.409550258007208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996eaf2de2aa921%3A0x559bf3044fb8d454!2sShivam%20medical%20store!5e0!3m2!1sen!2sin!4v1726341585620!5m2!1sen!2sin"
//                   width="100%"
//                   height="300"
//                   style={{ border: 0 }}
//                   allowFullScreen=""
//                   loading="lazy"
//                   title="Hospital Location"
//                 ></iframe>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Contact Information Section */}
//       <Row className="mt-5" data-aos="fade-up">
//         <Col md={12}>
//           <h3>Contact Information</h3>
//           <Row>
//             <Col md={4} className="mb-4">
//               <Card className="text-center secondary-background">
//                 <Card.Body>
//                   <BsFillTelephoneFill className="icon fs-3 text-primary" />
//                   <Card.Title>General Inquiries</Card.Title>
//                   <Card.Text>+91 6394323760</Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={4} className="mb-4">
//               <Card className="text-center secondary-background">
//                 <Card.Body>
//                   <BsFillTelephoneFill className="icon fs-3 text-primary" />
//                   <Card.Title>Emergency Contact</Card.Title>
//                   <Card.Text>+91 7379429626</Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={4} className="mb-4">
//               <Card className="text-center secondary-background">
//                 <Card.Body>
//                   <BsFillEnvelopeFill className="icon fs-3 text-primary" />
//                   <Card.Title>Email</Card.Title>
//                   <Card.Text>contact@shivammedical.com</Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Contact;

import React from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import {
  BsFillTelephoneFill,
  BsFillGeoAltFill,
  BsFillEnvelopeFill,
} from "react-icons/bs";
import Swal from "sweetalert2";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/v1/api/contact/contact`,
        formData
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Message sent successfully.",
        });
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send message. Please try again.",
      });
      console.log(error);
    }
  };

  return (
    <Container sx={{ py: 5 }} id="contactus">
      {/* Contact Form Section */}
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Get in Touch
          </Typography>
          <Typography variant="body1" paragraph>
            Have questions or need more information? Fill out the form below,
            and we will get back to you as soon as possible.
          </Typography>
          <form onSubmit={submitHandler}>
            <Grid container spacing={2} sx={{p:2, borderRadius:2}} bgcolor={"grey.100"}>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  fullWidth
                  label="Phone"
                  variant="outlined"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  fullWidth
                  label="Message"
                  variant="outlined"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={3}
                />
              </Grid>
            <Button type="submit" variant="contained" sx={{ mt: 3 }}>
              Send Message
            </Button>
            </Grid>
          </form>
        </Grid>

        {/* Map and Contact Info Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                <BsFillGeoAltFill /> Address
              </Typography>
              <Typography>Kakrahwa Bazar, Uttar Pradesh (272206)</Typography>
              <div className="map-iframe" style={{ marginTop: "16px" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221.3697493601068!2d83.2157607823993!3d27.409550258007208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996eaf2de2aa921%3A0x559bf3044fb8d454!2sShivam%20medical%20store!5e0!3m2!1sen!2sin!4v1726341585620!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Hospital Location"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Contact Information Section */}
      <Grid container spacing={4} sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Contact Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} >
              <Card sx={{ textAlign: "center" }} >
                <CardContent>
                  <BsFillTelephoneFill
                    className="icon"
                    size={24}
                    color="primary"
                  />
                  <Typography variant="h6">General Inquiries</Typography>
                  <Typography>+91 6394323760</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: "center" }}>
                <CardContent>
                  <BsFillTelephoneFill
                    className="icon"
                    size={24}
                    color="primary"
                  />
                  <Typography variant="h6">Emergency Contact</Typography>
                  <Typography>+91 7379429626</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: "center" }}>
                <CardContent>
                  <BsFillEnvelopeFill
                    className="icon"
                    size={24}
                    color="primary"
                  />
                  <Typography variant="h6">Email</Typography>
                  <Typography>contact@shivammedical.com</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
