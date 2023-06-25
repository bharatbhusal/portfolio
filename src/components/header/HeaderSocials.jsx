import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { IoLogoTwitter } from "react-icons/io";
import { FiInstagram } from "react-icons/fi";

const HeaderSocials = () => {
  return (
    <div className="header__socials">
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
  );
};

export default HeaderSocials;
