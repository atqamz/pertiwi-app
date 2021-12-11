import "./About.css";
import React, { Fragment } from "react";

const About = () => {
  return (
    <Fragment>
      <div className='aboutPage'>
        <div className='aboutContainer'>
          <h1>Our Story</h1>
          <div className='storyContainer'>
            <div className='storyHeader'>
              <h1>How We Make A Positive Impact</h1>
            </div>

            <div className='storyDetail'>
              <img src='/assets/aboutPage/aboutforyou.png' alt='For You' />
              <ul>
                <li>For You</li>
                <li>
                  With healthy sanitary napkins that are free from harmful chemicals, this
                  will not have a negative impact on the feminine area or body so that it
                  does not cause dangerous diseases.
                </li>
              </ul>
            </div>

            <hr />

            <div className='storyDetail'>
              <img src='/assets/aboutPage/aboutearth.png' alt='For Our Earth' />
              <ul>
                <li>For Our Earth Goodness</li>
                <li>
                  Be a change maker for Earth Better Future and bring impact to the
                  community. We are really proud to be “Produk Karya Anak Bangsa” which
                  supports a good environment in a sustainable manner for our children and
                  grandchildren.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
