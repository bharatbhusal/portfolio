import React from "react";
import "./index.css";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Projects from "./components/projects/Projects";
import Education from "./components/education/Education";

const App = () => {
  return (
    <>
      {/* Header component */}
      <Header />
      {/* Navigation component */}
      <Nav />
      {/* About component */}
      <About />
      {/* Contact component */}
      <Projects />
      <Education />
      <Contact />
      {/* Footer component */}
      <Footer />
    </>
  );
};

export default App;
