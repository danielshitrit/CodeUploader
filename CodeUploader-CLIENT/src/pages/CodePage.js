import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:4000");

export function CodePage() {
  const { codeIndex } = useParams();
  const [code, setCode] = useState("");
  const [isMentor, setIsMentor] = useState(false);

  useEffect(() => {
    setIsMentor(true);

    socket.on("codeChange", ({ codeIndex: receivedIndex, newCode }) => {
      if (parseInt(codeIndex) === receivedIndex) {
        setCode(newCode);
      }
    });

    return () => {
      socket.off("codeChange");
    };
  }, [codeIndex]);

  const handleCodeChange = (newCode) => {
    if (isMentor) return; 
    setCode(newCode);

    socket.emit("codeChange", {
      codeIndex: parseInt(codeIndex),
      newCode,
    });
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
        rows={10}
        cols={50}
        readOnly={isMentor}
      />
    </div>
  );
}

export default CodePage;
