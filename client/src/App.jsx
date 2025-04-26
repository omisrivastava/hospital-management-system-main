import React from "react";
import "./App.css";
import Home from "./Pages/Home";
import Footer from "./Components/Footer.jsx";
import AboutUs from "./Pages/AboutUs";
import Appointment from "./Pages/Appointment";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AddNewDoctor from "./Components/AddNewDoctor"
import AddNewAdmin from "./Components/AddNewAdmin";
import Messages from "./Components/Messages";
import Doctors from "./Components/Doctors";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Components/Dashboard";
import Sidebar from "./Components/Sidebar";
import AuthProvider from "./context/AuthContext.jsx";

const App = () => {


  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Sidebar />} >
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/doctor/addnew" element={<AddNewDoctor />} />
            <Route path="/admin/addnew" element={<AddNewAdmin />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/doctors" element={<Doctors />} />
          </Route>
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </AuthProvider>
    </Router>
  );
};

export default App;
