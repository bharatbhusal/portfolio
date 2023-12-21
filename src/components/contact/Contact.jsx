import React from "react";
import "./contact.css";
import { AiFillMail } from "react-icons/ai";
import { FaFacebookMessenger } from "react-icons/fa";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { useRef } from "react";
import emailjs from "emailjs-com";
import env from "../../utils/validateEnv"

const Contact = () => {
  const form = useRef();

  // Function to send an email using emailjs
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      env.REACT_APP_SERVICE_ID,
      env.REACT_APP_TEMPLATE_ID,
      form.current,
      env.REACT_APP_USER_ID
    );
    e.target.reset();
  };

  return (
    <section id="contact">
      <h5>Get in Touch</h5>
      <h2>Contact Me</h2>
      <div className="container contact__container">
        {/* Contact options */}
        <div className="contact__options">
          <article className="contact__option">
            <AiFillMail className="contact__option-icon" />
            <h4>Email</h4>
            <h5>bharatbhusal78@gmail.com</h5>
            <a href="mailto:bharatbhusal78@gmail.com" target="_blank" rel="noreferrer">
              Send a message
            </a>
          </article>
          <article className="contact__option">
            <FaFacebookMessenger className="contact__option-icon" />
            <h4>Messenger</h4>
            <h5>Bharat Bhusal</h5>
            <a href="https://m.me/bharatbhusal78" target="_blank" rel="noreferrer">
              Send a message
            </a>
          </article>
          <article className="contact__option">
            <AiOutlineWhatsApp className="contact__option-icon" />
            <h4>WhatsApp</h4>
            <h5>+917416476507</h5>
            <a
              href="https://api.whatsapp.com/send?phone=+917416476507"
              target="_blank" rel="noreferrer"
            >
              Send a message
            </a>
          </article>
        </div>
        {/* END OF CONTACT OPTIONS */}

        {/* Contact form */}
        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            required
          />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea
            name="message"
            rows="7"
            placeholder="Your Message"
          ></textarea>
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
