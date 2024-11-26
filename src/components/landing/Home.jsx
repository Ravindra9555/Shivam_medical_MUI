import React from "react";
import HomeNavbar from "./HomeNavbar";
import Hero from "./Hero";
import About from "./About";
import Appointment from "./Appointment";
import Contact from "./Contact";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import InfoFormToDetectProblem from "./InfoFormToDetectProblem";

const Home = () => {

  return (
    <>
    <HomeNavbar  />
    <div style={{ paddingTop: '70px' }}> {/* Adjust padding based on navbar height */}
      <Hero />
      <About />
      <InfoFormToDetectProblem/>
      <Appointment />
      <Contact />
      <Footer />
      <Link to="/adminlogin">Ad</Link>
    </div>
  </>
  );
};

export default Home;
