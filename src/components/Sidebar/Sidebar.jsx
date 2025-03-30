import React, { useState, useEffect } from 'react';
import cvs_logo from '../../assets/Store-logos/cvs.png';
import shoprite_logo from '../../assets/Store-logos/shoprite.png';
import walgreens_logo from '../../assets/Store-logos/walgreens.png';
import hannaford_logo from '../../assets/Store-logos/hannaford.png';
import { CiSquareRemove } from "react-icons/ci";
import './Sidebar.css';

const Sidebar = ({ showSidebar, setStores, cart, setCart }) => {
  const [selectedStores, setSelectedStores] = useState([
    { name: 'cvs', logo: cvs_logo, checked: true }, // Set all checked by default
    { name: 'shoprite', logo: shoprite_logo, checked: true },
    { name: 'walgreens', logo: walgreens_logo, checked: true },
    { name: 'hannaford', logo: hannaford_logo, checked: true },
  ]);

  useEffect(() => {
    // Assuming setStores expects an array of selected store names
    const selectedStoreNames = selectedStores.filter(store => store.checked).map(store => store.name);
    setStores(selectedStoreNames);
  }, [selectedStores, setStores]);

  const toggleStoreSelection = (store) => {
    setSelectedStores(current =>
      current.map(item => (item.name === store ? { ...item, checked: !item.checked } : item))
    );
  };

  const removeCartItem = (itemName) => {
    const updatedCart = cart.filter(item => item.name !== itemName);
    setCart(updatedCart);
  };

  // eslint-disable-next-line
  // const { cartItems, addItemToCart, removeItemFromCart } = useCart();

  return (
    <>
      <div className="sidebar" style={!showSidebar ? { width: "0" } : {}}>
        {/* <div className="sidebar-header"></div> */}
        <div className="sidebar-menu">
          {selectedStores.map((store, index) => (
            <div key={index} className={`menu-item ${store.checked ? 'selected' : ''}`} onClick={() => toggleStoreSelection(store.name)}>
              <img src={store.logo} alt={store.name} className="store_logo" />
              {store.name.charAt(0).toUpperCase() + store.name.slice(1)}
              <div className="container">
                <input type="checkbox" id="cbx" checked={store.checked} onChange={() => toggleStoreSelection(store.name)} />
                <label htmlFor="cbx" className="check">
                  <svg width="18px" height="18px" viewBox="0 0 18 18">
                    <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                    <polyline points="1 9 7 14 15 4"></polyline>
                  </svg>
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="sidebar-bottom">
            <div className="find-items">
              <h2>Cart</h2>
              <div className="item-list">
                {cart.map((item, index) => (
                  <div key={index} className="item">
                    <img src={item.images_links[0]} alt="Item Icon" className="item-icon" />
                    <div className="item-info">
                      <strong>{item.name}</strong>
                    </div>
                    <button 
                      onClick={() => { removeCartItem(item.name); }} 
                      className="remove-button"
                    >
                      <CiSquareRemove />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default Sidebar;
