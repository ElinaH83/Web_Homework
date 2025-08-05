import React, { useState, useEffect } from "react";
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

  const [auth] = useState({
    username: "elina",
    password: "123asd",
  });

  const authHeader = {
    Authorization: `Basic ${btoa(`${auth.username}:${auth.password}`)}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const register = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: auth.username,
            password: auth.password,
          }),
        });

        if (res.ok) {
          console.log("User registered");
        } else {
          console.log("User might already exist");
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    };

    register();
  }, [auth]);

  return (
    <div className="app">
      <Header
        title={title}
        setTitle={setTitle}
        shapes={shapes}
        setShapes={setShapes}
        authHeader={authHeader}
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