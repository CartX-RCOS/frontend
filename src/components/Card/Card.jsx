import React, { useState, useEffect } from 'react';
import { useCart } from '../../CartProvider';
import './Card.css';

const Card = ({ data }) => {

  console.log(data);

  // eslint-disable-next-line
  const { cartItems, addItemToCart, removeItemFromCart } = useCart();
  const [imageSrc, setImageSrc] = useState('');
  const [productSize, setProductSize] = useState('');

  useEffect(() => {
    const checkImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    };

    const findValidImage = async () => {
      for (let url of data.images_links) {
        if (await checkImage(url)) {
          setImageSrc(url);
          return;
        }
      }

      for (let matchKey in data.matches) {
        for (let url of data.matches[matchKey].images_links) {
          if (await checkImage(url)) {
            setImageSrc(url);
            return;
          }
        }
      }
    };

    findValidImage();
    const formatProductSize = () => {
      // Check if data.size contains any number
      const containsNumber = /\d/.test(data.size);
      if (!containsNumber && data.size && data.quantity) {
        // Combine data.quantity and data.size if data.size has no number
        return `${data.quantity} ${data.size}`;
      }
      // Return original size if condition not met
      return data.size;
    };

     setProductSize(formatProductSize());
  }, [data.images_links, data.matches, data.size, data.quantity]);

  const isInCart = cartItems.some(item => item._id === data._id);

  return (
    <div className="wrapper">
      <div className="overviewInfo">
        <div className="actions">
          <div className="backbutton ">
          </div>

          {/* cart button */}
          <div className="cartbutton neurobutton">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z"
                fill="currentColor"
              />
              <path
                d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z"
                fill="currentColor"
              />
              <path
                d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        <div className="productinfo">
          <div className="grouptext">
            <h3>STORE</h3>
            <p>PS5</p>
          </div>
          <div className="grouptext">
            <h3>SIZE</h3>
            <p>{data.size}</p>
          </div>
          <div className="grouptext">
            <h3>QUANTITY</h3>
            <p>{data.quantity}</p>
          </div>

          <div className="productImage">
            {/* <img src="https://i.imgur.com/ckSgzLQ.png" alt="product: ps5 controller image" /> */}
            {/* <img src={imageSrc} alt="Product name"/> */}
          </div>
        </div>
      </div>

      <div className="productSpecifications">
        <h6> {data.name} </h6>

        <div className="checkoutButton">
          <div className="priceTag">
            <span>$</span>{data.price}
          </div>
        </div>
      </div>
    </div>
  );
};

  // return (
  //   <>
  //     <div className="product-card">
  //       <img src={imageSrc} alt="Product name"/>
  //       <div className="info">
  //         <h3>{data.name}</h3>
  //         <p>Price : {data.price}</p>
          
  //         <button
  //           onClick={() => isInCart ? removeItemFromCart(data) : addItemToCart(data)}
  //           className={isInCart ? 'addToCart added' : 'addToCart'}>
  //           {isInCart ? 'Remove from Cart' : 'Add to Cart'}
  //         </button>  
        
  //       </div>
  //     </div>
  //   </>
  // );

export default Card;