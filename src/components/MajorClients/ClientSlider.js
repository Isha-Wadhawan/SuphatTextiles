// npm install slick-carousel --save --> command to install slick 
// npm install react-router-dom   --> command for router dom
import React from 'react';
import './ClientSlider.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ClientSlider = () => {
  return(
    <div>
    <div>
    <h2 className="header-animation">OUR MAJOR CLIENTS</h2>
    </div>
    <div className="logos">
  <div className="logos-slide">
    <a href="https://www.asavagroup.com"><img src="/images/asava.png" alt="ASAVA" /></a>
    <a href="https://elleboutique.com"><img src="/images/elle.png" alt="ELLE BOUTIQUE" /></a>
    <a href="https://www.itokin.com"><img src="/images/itokin.png" alt="ITOKIN" /></a>
    <a href="https://www.mistymynx.com"><img src="/images/misty_mynx.png" alt="MISTY" /></a>
    <a href="https://www.jaspal.com"><img src="/images/jaspal.png" alt="JASPAL" /></a>
  </div>
  <div className="logos-slide">
    <a href="https://www.asavagroup.com"><img src="/images/asava.png" alt="ASAVA" /></a>
    <a href="https://elleboutique.com"><img src="/images/elle.png" alt="ELLE BOUTIQUE" /></a>
    <a href="https://www.itokin.com"><img src="/images/itokin.png" alt="ITOKIN" /></a>
    <a href="https://www.mistymynx.com"><img src="/images/misty_mynx.png" alt="MISTY" /></a>
    <a href="https://www.jaspal.com"><img src="/images/misty_mynx.png" alt="JASPAL" /></a>
  </div>
</div>
  </div>
);
  }
export default ClientSlider;

  