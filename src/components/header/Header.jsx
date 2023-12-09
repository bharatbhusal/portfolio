import React from 'react';
import "./header.css";
import CTA from "./CTA";
import ME from "../../assets/me.png";
import HeaderSocials from "./HeaderSocials";

const Header = () => {
  return (
    <header id='home'>
      <div className="container header__container">
        {/* Introduction text */}
        <h5>Hello I'm</h5>
        <h1>Bharat Bhusal</h1>
        <h5 className="text-light">Professional Community Moderator</h5>

        {/* Call to Action component */}
        <CTA />

        {/* Social media icons component */}
        <HeaderSocials />

        {/* Displaying an image of yourself */}
        <div className="me">
          <img src={ME} alt="me" />
        </div>

        {/* Scroll Down link */}
        <a href="#contact" className="scroll__down">Scroll Down</a>
      </div>
    </header>
  );
};

export default Header;
