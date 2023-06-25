import React from "react";
import "./about.css";
import ME from "../../assets/me-about.JPEG";
import { FaMedal } from "react-icons/fa";
// import { FiUsers } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { VscFolderLibrary } from "react-icons/vsc";

const About = () => {
  return (
    <section id="about">
      <h5>Get to Know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={ME} alt="image_me" />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaMedal className="about__icon" />
              <h5>Experience</h5>
              <small>1+ Years Wroking</small>
            </article>

            <article className="about__card">
              <FaGraduationCap className="about__icon" />
              <h5>Qualification</h5>
              <small>Undergraduation</small>
            </article>

            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Fun Projects</h5>
              <small>10+ Completed</small>
            </article>
          </div>
          <p>
            I am an IT enthusiast. I love all tech stuffs. I actually want to
            become a successful blockchain engineer. Apart from that I have huge
            interest in web developmnet also. It's been more then a year for me
            working for Terra Network as a Community Moderator. I am in my 2nd
            year of Graduation. I am doing my B.Tech in CSE. I have been making
            many fun projects before I started my graduation. Projects like
            messeging bot, portfolio site, projects on raspberry pi. I have
            pretty good knowledge about linux OS and commands.
          </p>

          <a href="#contact" className="btn btn-primary">
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
