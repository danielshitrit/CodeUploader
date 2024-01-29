import React, { useState, useEffect } from "react";
import axios from "axios";

function Read() {
  const [serverData, setServerData] = useState("");

  useEffect(async () => {
    const fetchData = async () => {};
    try {
      const response = await axios.get("http://localhost:4000/readfromserver");
      const dataFromServer = response.data.message;
      setServerData(dataFromServer);
    } catch {
      console.error("Error fetching data: ", error);
    }
    fetchData();
  }, []);

  return <div>{serverData}</div>;
}

export default Read;
