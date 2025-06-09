import React from 'react';
import Homepage from '../components/Homepage';
import Header from '../components/Header';

const Home: React.FC = () => {
  return (
    <div>
        <Header/>
        <Homepage />
    </div>
  );
};

export default Home;