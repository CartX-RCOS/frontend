import React, { useState, useEffect } from 'react';
// import { useCart } from '../../CartProvider';
import './Card.css';

const Card = (props) => {
  // eslint-disable-next-line
  // const { cartItems, addItemToCart, removeItemFromCart } = useCart();
  // const [imageSrc, setImageSrc] = useState('');
  const [productSize, setProductSize] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  
  //   const checkImage = (url) => {
  //     return new Promise((resolve) => {
  //       const img = new Image();
  //       img.onload = () => resolve(true);
  //       img.onerror = () => resolve(false);
  //       img.src = url;
  //     });
  //   };

    // const findValidImage = async () => {
    //   for (let url of props.data.images_links) {
    //     if (await checkImage(url)) {
    //       setImageSrc(url);
    //       return;
    //     }
    //   }

    //   for (let matchKey in props.data.matches) {
    //     for (let url of props.data.matches[matchKey].images_links) {
    //       if (await checkImage(url)) {
    //         setImageSrc(url);
    //         return;
    //       }
    //     }
    //   }
    // };

    // findValidImage();
  //   const formatProductSize = () => {
  //     // Check if data.size contains any number
  //     const containsNumber = /\d/.test(props.data.size);
  //     if (!containsNumber && props.data.size) {
  //       // Combine data.quantity and data.size if data.size has no number
  //       return `${props.data.size}`;
  //     }
  //     // Return original size if condition not met
  //     return props.data.size;
  //   };

  //   setProductSize(formatProductSize());
  // }, [props.data.imageURL, props.data.size, props.data.price]);


  const handleAddToCart = (state) => {
    if (state) {
      props.addToCart(props.data);
    } else {
      props.removeFromCart(props.data);
    }
    
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
    handleAddToCart(!isClicked);
  };
  // const isInCart = cartItems.some(item => item._id === data._id);

  function checkImg(props) {
    if (props.data.images_links){
      return props.data.images_links[0];
    }
    else{
      return props.data.image_links[0];
    }
  }

  return (
    <>
      <div className="product-card">
        <button
          className={`add-button ${isClicked ? 'checked' : ''}`}
          aria-label="Add item"
          onClick={handleClick}
        />
        <img src={checkImg(props)} alt="Product name" />
        <div className="info">
          <h3>{props.data.name}</h3>
          <p>{props.data.size}</p>
        </div>
      </div>
    </>
  );
};

export default Card;