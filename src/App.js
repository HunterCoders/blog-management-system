import './App.css';
import Register from './Register';
import Login from './Login';
import Homepage from './Homepage';
import Inventory from './Inventory';
import AdminLogin from './Adminlogin';
import AdminOptions from './AdminOptions';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/hackathon" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/AdminOptions" element={<AdminOptions />} />
        <Route path="/admin/AdminOptions/add" element={<AdminOptions />} />
        <Route path="/admin/AdminOptions/delete" element={<AdminOptions />} />
        <Route path="/admin/AdminOptions/modify" element={<AdminOptions />} />
        <Route path="/admin/AdminOptions/see-all" element={<AdminOptions />} />
        <Route path="/admin/AdminOptions/see-added" element={<AdminOptions />} />


      </Routes>
    </Router>
  );
}

export default App;
