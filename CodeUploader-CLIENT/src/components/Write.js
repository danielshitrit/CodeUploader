import React, { useState } from "react";
import axios from "axios";

function Write() {
  let [inputValue, setInputValue] = useState("");

  const saveData = async () => {
    try {
      await axios.post("http://localhost:4000/writetodatabase", {
        content: inputValue,
      });
      console.log("Code Block: ", inputValue);
      alert("Code Block saved: ", inputValue);
    } catch (error) {
      console.log("error while saving: ", error.message);
    }
  };
  return (
    <div>
      <input
        type="string"
        placeholder="Enter code..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={saveData}> save data to mongodb</button>
    </div>
  );
}

export default Write;
