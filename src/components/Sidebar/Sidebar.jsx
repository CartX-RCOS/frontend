import React, { useState } from 'react';
// import cvs_image from '../../assets/Store-logos/cvs.png';
import target_image from '../../assets/Store-logos/target.png';
import hannaford_image from '../../assets/Store-logos/hannaford.png';
import shoprite_image from '../../assets/Store-logos/shoprite.png';

import './Sidebar.css';

const Sidebar = ({ setSelectedOption, showSidebar }) => {
  const storeNum = 4;
  const tabs = [
    { name: 'CVS', icon: shoprite_image },
    { name: 'Hannaford', icon: hannaford_image },
    { name: 'ShopRite', icon: shoprite_image },
    { name: 'Target', icon: target_image }
  ];

  // State to track the selected menu item, defaulting to 'general'
  const [selectedItem, setSelectedItem] = useState('general');

  // Function to handle menu item clicks
  const handleMenuItemClick = (itemName) => {
    setSelectedItem(itemName);
    setSelectedOption(itemName);
  };

  return (
    <>
      <div className="sidebar" style={!showSidebar ? { width: "0vw" } : null}>
        <div className="sidebar-header">
        </div>

        <div className="sidebar-menu">
          {tabs.slice(0, storeNum).map((tab, index) => (
            <div key={index} className="menu-item-container">
              <div
                className={`menu-item ${selectedItem === tab.name ? 'selected' : ''}`}
              >
                <img src={tab.icon} alt="" className="logos"/>
                {tab.name}
                <input type="checkbox" className="checkbox" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
