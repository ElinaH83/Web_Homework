import React from "react";
import "./styles/Sidebar.css";

const colors = [
  "white",
  "black",
  "red",
  "orange",
  "yellow",
  "rgb(79, 229, 255)", //light blue
  "rgb(45, 168, 255)", //blue
  "darkblue",
  "darkgreen",
  "lightgreen",
  "rgb(255, 140, 220)", //pink
  "rgb(191, 131, 255)", //violet
  "rgb(94, 0, 165)" //dark purple
];

const Sidebar = ({ onSelect, selectedColor, setColor }) => {
  return (
    <div className="sidebar">
      <div className="title">Colors</div>
      <div className="color-picker">
        {colors.map((color, index) => (
          <div
            key={index}
            className="color-switch"
            style={{
              backgroundColor: color,
              outline: selectedColor === color ? "2px solid #000" : "none",
            }}
            title={color || "No Color"}
            onClick={() => setColor(color)}
          />
        ))}
      </div>
      <div className="title">Shapes</div>
      <div className="tool-list">
        <div 
            className="shape circle"  
            draggable onDragStart={(e) => e.dataTransfer.setData("shape", "circle")} 
            onClick={() => onSelect("circle")}>

        </div>
        <div
            className="shape square"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("shape", "square")}
            onClick={() => onSelect("square")}
        >
        </div>
        <div
            className="shape triangle"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("shape", "triangle")}
            onClick={() => onSelect("triangle")}
        >
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
