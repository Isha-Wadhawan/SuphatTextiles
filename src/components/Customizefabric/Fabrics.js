import React from "react";
import "./fabrics.css";
import { FaWhatsapp } from "react-icons/fa";
const Fabrics = () => {

    const productData = [
    {
      name: "Blue Splash",
      productId: "12345",
      image: "fabricsImages/Fabric1.jpg",
    },
    {
      name: "Colored Fabrics",
      productId: "67890",
      image: "fabricsImages/Fabric2.jpg",
    },
    {
      name: "Floral pattterns",
      productId: "67890",
      image: "fabricsImages/Fabric3.jpg",
    },
    {
      name: "Floral print",
      productId: "67890",
      image: "fabricsImages/Fabric4.jpg",
    },
    {
      name: "Pastel floral",
      productId: "67890",
      image: "fabricsImages/Fabric5.jpg",
    },
    {
      name: "Dark florals",
      productId: "67890",
      image: "fabricsImages/Fabric6.jpg",
    },
    {
      name: "Pattens love",
      productId: "67890",
      image: "fabricsImages/Fabric7.jpg",
    },
    {
      name: "Pink love",
      productId: "67890",
      image: "fabricsImages/Fabric8.jpg",
    },
    {
      name: "Cats pattern",
      productId: "67890",
      image: "fabricsImages/Fabric9.jpg",
    },
    {
      name: "Simple designs",
      productId: "67890",
      image: "fabricsImages/Fabric10.jpg",
    },
    {
      name: "Smoky designs",
      productId: "67890",
      image: "fabricsImages/Fabric11.jpg",
    },
    {
      name: "Yellow Beauty",
      productId: "67890",
      image: "fabricsImages/Fabric12.jpg",
    },
    {
      name: "Elite checks",
      productId: "67890",
      image: "fabricsImages/Fabric13.jpg",
    },
    {
      name: "Small patterns",
      productId: "67890",
      image: "fabricsImages/Fabric14.jpg",
    },
    {
      name: "Plain colors",
      productId: "67890",
      image: "fabricsImages/Fabric15.jpg",
    },
    {
      name: "Summer simple",
      productId: "67890",
      image: "fabricsImages/Fabric16.jpg",
    },
    {
      name: "Garden pattern",
      productId: "67890",
      image: "fabricsImages/Fabric17.jpg",
    },
    {
      name: "Dark floral print",
      productId: "67890",
      image: "fabricsImages/Fabric18.jpg",
    },
    {
      name: "Lemon Print",
      productId: "67890",
      image: "fabricsImages/Fabric19.jpg",
    },
 
  ];

  // Hardcoded WhatsApp number
  const phoneNumber = "9354752206";
    return (
    <div className="product-list">
      {productData.map((product, index) => (
        <div className="product-card" key={index}>
          <img src={product.image} alt={product.name} />
          <p>{product.name}</p>
          <p>Product ID: {product.productId}</p>
          <a
            href={`https://api.whatsapp.com/send?phone=${phoneNumber}&text=Hello, I'm interested in product ${product.productId}:${product.name} Please share information`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp style={{ fontSize: '2em' }} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default Fabrics;
