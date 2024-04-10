// Inventory.js

import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Editor from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "./css/Inventory.css"; // Import the CSS file

function Inventory() {
  const [sessionData, setSessionData] = useState(null);
  const [blogContent, setBlogContent] = useState([]); // State to store blog content
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
    if (sessionData === null) return; // Do nothing if sessionData is null
    if (!sessionData.name) {
      navigate("/login?param=log"); // Redirect to the login page
    }
  }, [sessionData, navigate]);

  // Function to handle text input change
  const handleInputChange = (value) => {
    console.log(blogContent);
    setBlogContent(value);
  };
  const quillRef = useRef();
  const handleSubmit = async () => {
    try {
      await axios.post('/createBlogPost');
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };
  

  return (
    <div className="inventory-container">
      <h1>Create a Blog Post</h1>
      <form method="post" onSubmit={handleSubmit} action="http://localhost:3001/createBlogPost">
        <Editor
        ref={quillRef}
          value={blogContent}
          onChange={handleInputChange}
          placeholder="Write something amazing..."
          modules={{
            toolbar: [
              [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
              [{size: []}],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}, 
               {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'image', 'video'],
              ['clean']
            ]
          }}
          className="quill-editor" // Add a custom class to target the editor
        />
        <input name='content' value={blogContent} hidden></input>
        <button type="submit" className="submit-button">Save Post</button>
      </form>
    </div>
  );
}

export default Inventory;
