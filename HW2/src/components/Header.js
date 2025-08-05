import React from "react";
import "./styles/Header.css";

const Header = ({ title, setTitle, shapes, setShapes, authHeader }) => {
  const handleExport = async () => {
    const data = {
      title,
      shapesJson: JSON.stringify(shapes),
    };

    try {
      const res = await fetch("http://localhost:8080/api/drawings", {
        method: "POST",
        headers: authHeader,
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const data = JSON.stringify({ title, shapes }, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title || "Untitled"}.json`;
        a.click();
      } else {
        alert("Save failed");
      }
    } catch (err) {
      console.error("Error saving:", err);
    }
  };

  const handleImport = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/drawings", {
        method: "GET",
        headers: authHeader,
      });

      if (!res.ok) {
        alert("Failed to fetch drawing from server");
        return;
      }

      const drawing = await res.json();
      setTitle(drawing.title);
      setShapes(JSON.parse(drawing.shapesJson));
    } catch (err) {
      console.error("Error importing drawing:", err);
      alert("Import failed");
    }
  };

  return (
    <div className="header">
      <input
        className="title-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        <button onClick={handleExport}>Export</button>
        <button onClick={handleImport}>Import</button>
      </div>
    </div>
  );
};

export default Header;