import React from "react";
import "./nav.css";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdContact } from "react-icons/io";
import { MdCastForEducation } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";



import { useState } from "react";

const Nav = () => {
  // State to manage active navigation item
  const [activeNav, setActiveNav] = useState("#");

  return (
    <nav>
      {/* Home link with onClick event and dynamic class based on activeNav state */}
      <a
        onClick={() => setActiveNav("#home")}
        className={activeNav === "#home" ? "active" : ""}
        href="#home"
      >
        <AiFillHome />
      </a>

      {/* About link with onClick event and dynamic class based on activeNav state */}
      <a
        onClick={() => setActiveNav("#about")}
        className={activeNav === "#about" ? "active" : ""}
        href="#about"
      >
        <AiOutlineUser />
      </a>
      <a
        onClick={() => setActiveNav("#education")}
        className={activeNav === "#education" ? "active" : ""}
        href="#education"
      >
        <MdCastForEducation />
      </a>
      <a
        onClick={() => setActiveNav("#projects")}
        className={activeNav === "#projects" ? "active" : ""}
        href="#projects"
      >
        <GoProjectSymlink />
      </a>

      {/* Contact link with onClick event and dynamic class based on activeNav state */}
      <a
        onClick={() => setActiveNav("#contact")}
        className={activeNav === "#contact" ? "active" : ""}
        href="#contact"
      >
        <IoMdContact />
      </a>
    </nav>
  );
};

export default Nav;
