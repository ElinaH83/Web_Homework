import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [title, setTitle] = useState("Untitled");


  return (
    <div className="app">
      <Header
        title={title}
        setTitle={setTitle}
        shapes={shapes}
        setShapes={setShapes}
      />
      <div className="main">
        <Sidebar
          onSelect={setSelectedShape}
          selectedColor={selectedColor}
          setColor={setSelectedColor}
        />
        <Canvas
          shapes={shapes}
          setShapes={setShapes}
          selectedShape={selectedShape}
          selectedColor={selectedColor}
        />
      </div>
      <Footer shapes={shapes} />
    </div>
  );
}

export default App;