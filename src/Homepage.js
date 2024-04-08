import React from 'react';
import './css/Homepage.css'; // Import CSS file for styling
import { useSearchParams } from 'react-router-dom';

function Homepage() {
  const [name]=useSearchParams();

  return (
    <div className="homepage">
      <header>
        <nav>
          <ul>
            <li><a href="http://localhost:3000/register">Register</a></li>
            <li><a href="http://localhost:3000/login">Login</a></li>
            <li><a href="http://localhost:3000/admin">Admin Login</a></li>
            <li><a href="http://localhost:3000/inventory">Inventory</a></li>
          </ul>
        </nav>
        <div className="welcome">Welcome {name.get('name') && <div>{name.get('name')}</div>}</div>
      </header>
      <main>
        <div className="image-description">
          {/* <img src="your_image_url" alt="Website Description" /> */}
          <p>This is a description about the website. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </main>
      <footer>
        <p>&copy; 2023 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Homepage;
