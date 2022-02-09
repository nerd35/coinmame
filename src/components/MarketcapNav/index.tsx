import React from 'react';
import Sorting from '../sorting';

const MarketCapNav = () => {
  return (
    <div className="container-fluid hero-section mt-5  " style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div className="container ms-auto" >

        <Sorting/>
        </div>
    </div>
  );
}

export default MarketCapNav;
