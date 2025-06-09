import React from 'react';
import Homepage from '../components/Homepage';
import Header from '../components/Header';

const Home: React.FC = () => {
  return (
    <div>
        <Header/>
        <div>TEST HOME</div>
        <Homepage />
    </div>
  );
};

export default Home;