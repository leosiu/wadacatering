import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import OrderForm from './orderform';
//import Badge from '@mui/material/Badge';
//import ShoppingCart from '@mui/icons-material/ShoppingCart';
import api from '../../api';


const SamplePage = () => {
  const [lunchBoxes, setLunchBoxes] = useState([]);
  const [workDays, setWorkDays] = useState([]);
  //const [cartItems, setCartItems] = useState({});



  const handleAddToCart = (date, lunchBox) => {
    setCartItems((prevItems) => {
      const newItems = { ...prevItems };
      newItems[date] = lunchBox;
      return newItems;
    });
  };


  useEffect(() => {
    async function fetchData() {
      const lunchBoxesRes = await api.get('/api/lunchboxes');
      const workDaysRes = await api.get('/api/workdays');
      setLunchBoxes(lunchBoxesRes.data);
      setWorkDays(workDaysRes.data);
    //  console.log('Fetched work days:', workDaysRes.data);
    //  console.log('Fetched lunch boxes:', lunchBoxesRes.data);

    }
    fetchData();
  }, []);



  return (

  <div>
        <h1>Lunch Box</h1>
        <OrderForm
            lunchBoxes={lunchBoxes}
            workDays={workDays}
            //onSubmit={handleSubmit}
            onAddToCart={handleAddToCart}
        />

      </div>


  );
};


export default SamplePage;
