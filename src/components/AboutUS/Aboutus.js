import React from 'react';
import './styles.css'; // Import your CSS file
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div>
      <div className="container">
        <div className="image-row">
          <div className="col-md-6">
            <h3>Welcome to SUPHAT TEXTILES</h3>
            <p>"We are a passionate team of textile enthusiasts dedicated to providing the finest and most exquisite textiles to our customers.Our mission is to weave excellence into every fabric and thread we offer, while being committed to sustainability and craftsmanship."</p>
            <p>"At Suphat Textile, we are passionate about bringing you the finest and most exquisite textiles that enrich your life with beauty, comfort, and style. With a heritage rooted in craftsmanship and a commitment to innovation, we have been serving our customers with pride for [number of years] years."</p><br /><br />
          </div>
          <div className="col-md-6 text-center">
            <div className="image-container-img">
            <img src="/images/AboutUs.jpg" alt="Image 1" style={{ width: '400px', height: '300px' }} />
            </div>
          </div>
        </div>

        <div className="image-row">
          <div className="col-md-6 text-center">
            <div className="image-container-img">
              <img src="/images/OurStory.jpg" alt="Image 2" style={{ width: '400px', height: '300px'  }}/>
            </div>
          </div>
          <div className="col-md-6">
            <h3>Our Story</h3>
            <p>"Our journey began in (year) when a group of visionary textile enthusiasts came together with a shared dream - to provide the world with textiles that captivate the senses and elevate everyday experiences. What started as a small family business has now blossomed into a leading name in the industry, renowned for our exceptional product quality and customer-centric approach."</p><br />
          </div>
        </div>

        <div className="image-row">
          <div className="col-md-6"><br></br>
            <br />
            <h3>Join Our Textile Journey</h3>
            <p>"We invite you to explore our captivating collection of textiles that inspire, enrich, and enliven spaces and lives. Whether you are looking for luxurious fabrics for your home or elegant apparel to elevate your wardrobe, we are here to cater to your unique tastes and preferences.
            Thank you for choosing SUPHAT TEXTILES to be a part of your textile journey. We look forward to serving you and becoming your trusted companion in all your textile endeavors."</p>
          </div>
          <div className="col-md-6 text-center"><br></br>
            <div className="image-container-img">
              <img src="/images/mission.jpg" alt="Image 3" style={{ width: '400px', height: '300px' }} />
            </div>
          </div>
        </div>
      </div>
        {/* <ClientSlider/> */}
    </div>

  );
};

export default AboutUs;
