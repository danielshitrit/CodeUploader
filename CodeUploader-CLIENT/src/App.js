import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { LobbyPage } from "./pages/LobbyPage";
import { CodePage } from "./pages/CodePage";

import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:4000");

function App() {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    fetchCodeBlocks();

    socket.on("codeChange", ({ codeIndex, newCode }) => {
      setCodeBlocks((prevCodeBlocks) =>
        prevCodeBlocks.map((block, index) =>
          index === codeIndex ? { ...block, code: newCode } : block
        )
      );
    });

    return () => {
      socket.off("codeChange");
    };
  }, []);

  const fetchCodeBlocks = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/codeBlocks");
      const data = await response.json();
      setCodeBlocks(data.codeBlocks);
    } catch (error) {
      console.error("Error fetching code blocks:", error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LobbyPage codeBlocks={codeBlocks} />} />
          <Route
            path="/code/:codeIndex"
            element={({ params }) => (
              <CodePage codeIndex={params.codeIndex} codeBlocks={codeBlocks} />
            )}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
