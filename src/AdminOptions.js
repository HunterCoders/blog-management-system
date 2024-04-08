import React from "react";
import { Link } from "react-router-dom";
import "./css/AdminOptions.css"; // Import the CSS file

function AdminPage() {
  return (
    <div className="admin-panel">
      <h1>Welcome to the Admin Panel</h1>
      <div>
        <Link className="admin-panel-link" to="./add">Add Customer</Link>
      </div>
      <div>
        <Link className="admin-panel-link" to="./delete">Delete Customer</Link>
      </div>
      <div>
        <Link className="admin-panel-link" to="./modify">Modify Customer</Link>
      </div>
      <div>
        <Link className="admin-panel-link" to="./see-all">See All Customers</Link>
      </div>
      <div>
        <Link className="admin-panel-link" to="./see-added">See All Added Customers</Link>
      </div>
    </div>
  );
}

export default AdminPage;
