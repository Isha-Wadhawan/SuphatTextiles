import React from 'react';
import './Learn.css'
const Learn = ()=>{

    return(
  <>
  <div className="container">
    <div className="serviceBox">
      <div className="icon" style={{'--i':'#4eb7ff'}}>
        <img src="images/quality.png" alt= "quality" />
      </div>
      <div className="content">
        <h3>High-Quality Fabrics</h3>
        <p>"Indulge in luxury and durability with our textile websites exquisite selection of high-quality fabrics, crafted to elevate your creations"</p>
      </div>
    </div>
    <div className="serviceBox">
      <div className="icon" style={{ '--i': '#fd6494'}}>
        <img src="images/widerange.png" alt= "widerange" />
      </div>
      <div className="content">
        <h3>Wide Range of Designs</h3>
        <p>"Immerse yourself in a world of creativity with our textile website vast tapestry of designs, curated to suit every taste and project."</p>
      </div>
    </div>
    <div className="serviceBox">
      <div className="icon" style={{'--i': '#43f390'}}>
        <img src="images/customization.png" alt= "customization" />
      </div>
      <div className="content">
        <h3>Customization Options</h3>
        <p>"Tailor your textile desires to perfection with our website's extensive customization options, empowering you to transform imagination into fabric reality."</p>
      </div>
      </div>
    <div className="serviceBox">
      <div className="icon" style={{'--i':'#ffb508'}}>
        <img src="images/sustainability.png" alt= "sustainability" />
      </div>
      <div className="content">
        <h3>Sustainable Practices</h3>
        <p>"Discover a greener way to adorn fashion and interiors on our textile website, where sustainable practices weave together style and conscience."</p>
      </div>
    </div>
    <div className="serviceBox">
      <div className="icon" style={{'--i':'#37ba82'}}>
        <img src="images/innovative_idea.png" alt= "innovative" />
      </div>
      <div className="content">
        <h3>Innovative Techniques</h3>
        <p>"Experience textiles reimagined through a symphony of innovation on our website, where tradition meets technology in crafting the future of fabrics."</p>
      </div>
    </div>
    <div className="serviceBox">
      <div className="icon" style={{'--i':'#cd57ff'}}>
        <img src="images/retail.png" alt= "retail" />
      </div>
      <div className="content">
        <h3>Wholesale and Retail</h3>
        <p>"Explore a diverse range of textiles at competitive prices, with options for bulk purchasing or individual shopping"</p>
      </div>
    </div>  
    </div>
  </>
);
}

export default Learn;