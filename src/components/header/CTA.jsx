import React from 'react';
import CV from "../../assets/cv.pdf";

const CTA = () => {
  return (
    <div className="cta">
      {/* Download CV button */}
      <a href={CV} download className='btn'>Download CV</a>

      {/* Let's Talk button linking to the contact section */}
      <a className="btn btn-primary" href="#contact">Let's Talk</a>
    </div>
  );
}

export default CTA;
