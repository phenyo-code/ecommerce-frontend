import React from 'react';
import './hero.css';  // Optional: for styling

const Hero = ({ title, subtitle }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <button className="shop-now-btn">Shop Now</button>
      </div>
    </section>
  );
};

export default Hero;
