import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {fetchSingleProduct} from "../state/reducers/productSlice";
import { useParams } from "react-router-dom";
const Overview = () => {

const dispatch = useDispatch();
const {id} = useParams();
console.log(id)
const {singleProduct} = useSelector((state)=> state.product);
console.log(singleProduct)
  const images = [
    "/img/product1.jpg",
    "/img/product2.jpg",
    "/img/product3.jpg"
  ]

  const [currentImage, setCurrentImage] = useState(0)
  
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  useEffect(() => {
  if (id) {
    dispatch(fetchSingleProduct(id));
  }
}, [dispatch, id]);
if (!singleProduct) {
  return <h2>Loading...</h2>;
}

  return (
   <div className="overview-container">
     <div className='overview-card'>

      {/* Image Slider */}
      <div className="image-slider">
        <button onClick={prevImage}>◀</button>

        <img src={singleProduct.image} alt="product" />

        <button onClick={nextImage}>▶</button>
      </div>

      <div className='card-info'>
        <h2>{singleProduct.name}</h2>
         <span className='discount'>
          10% off
        </span>

        <span className='price'>
          ₹{singleProduct.price}
        </span>
       

        <p>
        {singleProduct.description.slice(0,50)}...
        </p>
     
      </div>
      <Link to={`/confirm/${singleProduct._id}`}>BUY NOW</Link>

    </div>
   </div>
  )
}

export default Overview
