import React from 'react'
import styled  from 'styled-components';
import { useState, useEffect } from 'react';
import ProductCard from "./ProductCard.js";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/loader/Loader";
import './Home.css'
import { Navigate } from 'react-router-dom';

const Home = () => {

  const images = ["HomePageImages/Home1.jpg", "HomePageImages/Home2.jpg", "HomePageImages/Home3.jpeg"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    },2000);

    return () => clearInterval(interval);
  });
      
  const dispatch = useDispatch();//
  const {loading, error, products} = useSelector(state => state.products) //
  // const [products, setProducts] = useState([]);

  useEffect(()=>{
       dispatch(getProduct());
   
  }, [dispatch]) 

  return (
    <>
    <HomeCSS>
    <h1 style={{paddingTop: '0rem', fontSize:'40px'}}></h1>
    <div className = "home">
     <img src={images[currentImageIndex]} className="pic" alt="im" />
      <div className="content">
      <h1 className="letter-animation">Welcome to</h1>
      <h4 className="letter-animation">Suphat Textile !!</h4>
      <h3>Stitching Dreams, Weaving Excellence: Transforming the Textile Frontier</h3>
      {/* <button className = "explore-btn" onClick={<Navigate to = "/products"className="nav-link"></Navigate>}>Explore now</button> */}
      </div>  
    </div>
    <h1 style={{textAlign: "center", fontFamily: "cursive", fontSize: "30px"}}>OUR HOTSELLERS</h1>
    <section className='image-row'>
        <img src='imagesProducts/burn-fabric.jpeg'/>
        <img src='imagesProducts/coating-fabric.jpeg'/>
        <img src='imagesProducts/jacquard-fabric.jpeg'/>
      </section>
{
    loading ? <Loader/> :  <div>
    <h1 style={{textAlign: "center", fontFamily: "cursive", fontSize: "20px" , paddingTop : "20px"}}>Featured Products</h1>
         <div className="products">
         {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
       </div>
  </div> 
  
}
    </HomeCSS>
    </>
       
  );
};


const HomeCSS = styled.section

 `
 .home{
  display: flex;
  background-color: white;
  text-align: center;
  padding-top: 5%;
  padding-left: 5%;
  height: 100vh;
  width: 100%;
}
.home .pic{
  display: flex;
  padding-left: 10px;
  width: 50%;
  height: 80%;
  
}
.home .content{
  padding-left: 3%;
  padding-top: 5%;
}
.home .content h3{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  padding-top  : 2rem;
  font-size : 20px;
  color  :rgb(62, 60, 60);

}
.home h1{
  font-size : 40px;
  color : rgb(62, 60, 60);
}
.home h4{
  font-size : 50px;
  color: rgb(139, 126, 174);
}

.home .content .letter-animation {
  white-space: nowrap; 
  overflow: hidden; 
  animation: typing 3s steps(100, end);
}

@keyframes typing {
  from {
    width: 0; /* Start with no width */
  }
  to {
    width: 100%; /* Expand to full width */
  }
}

.explore-btn{
  padding  : 10px;
  // background-color : rgba(113, 112, 114, 0.678);
  background-color : rgb(139, 126, 174);
  color : black;
  border  :none;
  border-radius : 0px;
  font-size : 2rem;
  margin-top: 10px;
  text-decoration : none;

}
.explore-btn:hover{
  font-size : 23px;
}
.nav-link {
  text-decoration: none; /* Remove underline */
}

.image-row{
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: rgba(243, 243, 245, 0.582);  
}

.image-row img {
  max-height: 20%;
  max-width: 20%;
  margin: 0 30px;
}


`;


export default Home
