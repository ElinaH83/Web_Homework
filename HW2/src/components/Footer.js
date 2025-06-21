import React from "react";
import "./styles/Footer.css";

const Footer = ({ shapes }) => {
  const counts = {
    circle: 0,
    square: 0,
    triangle: 0,
  };

  shapes.forEach((s) => counts[s.type]++);

  return (
    <div className="counter-bar">
      <div className="counter"><div className="icon circle" /> {counts.circle}</div>
      <div className="counter"><div className="icon square" /> {counts.square}</div>
      <div className="counter"><div className="icon triangle" /> {counts.triangle}</div>
    </div>
  );
};

export default Footer;