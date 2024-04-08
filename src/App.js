import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import "./styles/lib/bootstrap.css";
import "./styles/App.scss";
import MainView from "./components/main_view";
import Homepage from "./pages/homepage";
import Store from "./pages/store";
import Contact from "./pages/contact";
import Keyring from "./pages/product_page";
import Login from "./pages/login";
import Admin from "./pages/admin";
import AddProduct from "./pages/add_product";


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainView />}>
              <Route index element={<Homepage />} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/store" element={<Store/>} />
              <Route path={`/store/:keyringId`} element={<Keyring/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/admin" element={<Admin/>} />
              <Route path="/add-product" element={<AddProduct/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
