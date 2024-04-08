import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Inventory() {
  const [sessionData, setSessionData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/getSession")
      .then((response) => {
        const data = response.data;
        console.log(response);
        setSessionData(data);
      })
      .catch((error) => {
        console.error("Error fetching session data:", error);
      });
  }, []); 

  useEffect(() => {
    console.log(sessionData+"---");
    // console.log(sessionData.name);
    if (sessionData === null) return; // Do nothing if sessionData is null
    if (!sessionData.name) {
      navigate("/login?param=log"); // Redirect to the login page
    }
  }, [sessionData, navigate]);

  return (
    <div>
      {sessionData && <div style={{ color: "white" }}>{sessionData.name}</div>}
    </div>
  );
}

export default Inventory;
