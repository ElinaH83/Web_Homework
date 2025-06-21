import React from "react";
import "./styles/Header.css";

const Header = ({ title, setTitle, shapes, setShapes}) => {
  const handleExport = () => {
    const data = JSON.stringify({ title, shapes }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title || "Untitled"}.json`;
    a.click();
  };

  const handleImport = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = JSON.parse(reader.result);
      setTitle(result.title);
      setShapes(result.shapes);
    };
    reader.readAsText(e.target.files[0]);
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
        <label className="import-btn">
          Import
          <input type="file" accept=".json" onChange={handleImport} hidden />
        </label>
      </div>
    </div>
  );
};

export default Header;
