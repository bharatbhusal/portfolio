import React from "react";
import "./footer.css";

import { BsLinkedin } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { IoLogoTwitter } from "react-icons/io";
import { FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <section id="footer">
      <a href="" className="footer__logo">
        BHARAT
      </a>
      <ul className="permalinks">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#contact">Contacts</a>
        </li>
      </ul>
      <div className="footer__socials">
        <a href="https://www.linkedin.com/in/bharatbhusal78" target="_blank">
          <BsLinkedin />
        </a>
        <a href="https://www.facebook.com/bharatbhusal78" target="_blank">
          <BsFacebook />
        </a>
        <a href="https://github.com/bharatbhusal" target="_blank">
          <BsGithub />
        </a>
        <a href="https://twitter.com/0petermartin0" target="_blank">
          <IoLogoTwitter />
        </a>
        <a href="https://www.instagram.com/bharatbhusal/" target="_blank">
          <FiInstagram />
        </a>
      </div>
      <div className="footer__copyright">
        <small>&copy; Bharat Bhusal. All rights reserved.</small>
      </div>
    </section>
  );
};

export default Footer;
