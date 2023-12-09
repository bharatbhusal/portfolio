import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { IoLogoTwitter } from "react-icons/io";
import { FiInstagram } from "react-icons/fi";

const HeaderSocials = () => {
  return (
    <div className="header__socials">
      {/* LinkedIn icon with a link to your LinkedIn profile */}
      <a href="https://www.linkedin.com/in/bharatbhusal" target="_blank" rel="noreferrer">
        <BsLinkedin />
      </a>

      {/* Facebook icon with a link to your Facebook profile */}
      <a href="https://www.facebook.com/bharatbhusal78" target="_blank" rel="noreferrer">
        <BsFacebook />
      </a>

      {/* GitHub icon with a link to your GitHub profile */}
      <a href="https://github.com/bharatbhusal" target="_blank" rel="noreferrer">
        <BsGithub />
      </a>

      {/* Twitter icon with a link to your Twitter profile */}
      <a href="https://twitter.com/bharatbhusal02" target="_blank" rel="noreferrer">
        <IoLogoTwitter />
      </a>

      {/* Instagram icon with a link to your Instagram profile */}
      <a href="https://www.instagram.com/bharatbhusal/" target="_blank" rel="noreferrer">
        <FiInstagram />
      </a>
    </div>
  );
};

export default HeaderSocials;
