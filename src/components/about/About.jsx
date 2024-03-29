import React from "react";
import "./about.css";
import ME from "../../assets/me-about.JPEG";
import { FaMedal } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { VscFolderLibrary } from "react-icons/vsc";

const About = () => {
  return (
    <section id="about">
      <h5>Get to Know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        {/* About Me Image */}
        <div className="about__me">
          <div className="about__me-image">
            <img src={ME} alt="image_me" />
          </div>
        </div>

        {/* About Me Content */}
        <div className="about__content">
          {/* About Me Cards */}
          <div className="about__cards">
            <article className="about__card">
              <FaMedal className="about__icon" />
              <h5>Experience</h5>
              <small>2+ Years Working</small>
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

          {/* About Me Description */}
          <p>
            Hey there! Are you on the lookout for a full-stack web3 development guru with a rich arsenal of skills and experience? Search no more!<br/>

            With a strong foundation in RUST, TypeScript, React, Express, MongoDB, I'm a seasoned developer with the knack for crafting innovative and efficient solutions.<br/>

            Currently serving as an ambassador moderator at <a href="https://www.routerprotocol.com/" target="_blank" rel="noopener noreferrer">Router Protocol</a> after two years of experience at <a href="https://www.terra.money/" target="_blank" rel="noopener noreferrer">Terra Networks</a>, where for the past four years, I've been contributing my expertise and making a mark in the world of technology.<br/>

            Pursuing my Bachelor's degree with a focus on computer science, I'm passionate about leveraging my technical know-how to create impactful software that resonates with users.<br/>

            With a keen eye for detail and a commitment to excellence, I'm dedicated to delivering high-quality results and raising the bar in software development.<br/>
            If you're looking for someone to bring fresh ideas, innovation, and a positive impact to your team, let's connect! I'm eager to explore new opportunities that will allow me to expand my expertise and make waves in the software development space.
          </p>

          {/* Contact CTA */}
          <a href="#contact" className="btn btn-primary">
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
