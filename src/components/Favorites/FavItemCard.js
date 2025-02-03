import React from 'react'
import { Link } from "react-router-dom";
import './FavItemCard.css';

const FavItemCard = ({item , deleteFavItems }) => {
  return (
    <>
    
    <div className='CartItemCard'>
      <img src = {item.image} alt = "ssa"/>
      <div>
        <Link to = {`/product/${item.product}`}>{item.name}</Link>
        <p  onClick={() => deleteFavItems(item.product)}>Remove</p>
      </div>
    </div>

    </>
    
  )
}

export default FavItemCard
