import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./views/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import UsersList from "./views/UsersList/UserList";
import UserProfile from "./views/UserProfile/UserProfile";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/userprofile/:email" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
