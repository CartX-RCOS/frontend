import { useState, useEffect } from 'react';
import './index.css'
import NavBar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Content from '../../components/Content/Content'
import axios from 'axios';


const Home = () => {
  const [address, setAddress] = useState();
  const [onAnalysis, setOnAnalysis] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [data, setData] = useState();
  const [stores, setStores] = useState(['walgreens', 'cvs', 'hannaford']);
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    return savedCart ? savedCart : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
  }, [cart]);

  const parseAddress = (address) => {
    var regex = /([^,]+),\s*([A-Za-z]{2})\s*(\d{5})/;
    var match = address.match(regex);

    if (match) {
      var city = match[1].trim();
      var zipCode = match[3].trim();
      return city + " " + zipCode ;
    } else {
      return null;
    }
  }

  const getAddress = async (address) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await axios.post(`${apiUrl}/convertCoordinates`, { location: address });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        let data = await getAddress([latitude, longitude]);
        setAddress(parseAddress(data));
      });
    }
    else {
      console.log("Geolocation is not supported by this browser.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (address) {
      setAddress(address);
      localStorage.setItem('address', address);
    }
  }, [address]);

  return (
    <>
      <Sidebar showSidebar={showSidebar} setStores={setStores} cart={cart} setCart={setCart}/>
      <Content className="content" sidebar={showSidebar} data={data} setCart={setCart} cart={cart} onAnalysis={onAnalysis}/>
      <NavBar changeAddress={setAddress} setShowSidebar={setShowSidebar} setData={setData} stores={stores} onAnalysis={onAnalysis} setOnAnalysis={setOnAnalysis}/>
    </>
  )
}

export default Home;

