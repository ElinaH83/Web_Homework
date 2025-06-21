import React, {useRef} from "react";
import "./styles/Canvas.css";

const Canvas = ({ shapes, setShapes, selectedShape, selectedColor }) => {
  const clickTimeoutRef = useRef(null);

  const addShape = (shape) => setShapes([...shapes, shape]);

  const handleAdd = (e, droppedShape = null) => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      return;
    }

    clickTimeoutRef.current = setTimeout(() => {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (droppedShape) {
        addShape(droppedShape);
      } else if (selectedShape) {
        const newShape = {
          id: Date.now(),
          type: selectedShape,
          x,
          y,
          color: selectedColor,
        };
        addShape(newShape);
      }

      clickTimeoutRef.current = null;
    }, 250);
  };

  const handleDelete = (id) => {
    setShapes(shapes.filter((s) => s.id !== id));
  };

  const handleDrag = (id, x, y) => {
    setShapes(
      shapes.map((shape) =>
        shape.id === id ? { ...shape, x, y } : shape
      )
    );
  };
  const handleDragStart = (e, shape) => {
    e.dataTransfer.setData("id", shape.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const shapeType = e.dataTransfer.getData("shape");
    const id = e.dataTransfer.getData("id");

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (shapeType) {
      const newShape = {
        id: Date.now(),
        type: shapeType,
        x,
        y,
        color: selectedColor,
      };
      handleAdd({ clientX: e.clientX, clientY: e.clientY, target: e.currentTarget }, newShape);
    } else if (id) {
      handleDrag(Number(id), x, y);
    }
  };

  return (
    <div
      className="canvas"
      onClick={handleAdd}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {shapes.map((shape) => {
        const baseStyle = {
          left: shape.x,
          top: shape.y,
          position: "absolute",
          cursor: "move",
        };

        if (shape.type === "triangle") {
          return (
            <div
              key={shape.id}
              className="shape triangle"
              style={{
                ...baseStyle,
                width: 40,
                height: 40,
                backgroundColor: shape.color==="white" ? "#ededed": shape.color,
                clipPath: "polygon(50% 0, 0 100%, 100% 100%)",
              }}
              draggable
              onDoubleClick={() => handleDelete(shape.id)}
              onDragStart={(e) => handleDragStart(e, shape)}
            />
          );
        }

        return (
          <div
            key={shape.id}
            className={`shape ${shape.type}`}
            style={{
              ...baseStyle,
              width: 40,
              height: 40,
              backgroundColor: shape.color,
              border: shape.color==="white" ? "1px solid gray" : "none",
              borderRadius: shape.type === "circle" ? "50%" : "0"
            }}
            draggable
            onDoubleClick={() => handleDelete(shape.id)}
            onDragStart={(e) => handleDragStart(e, shape)}
          />
        );
      })}
    </div>
  );
};

export default Canvas;