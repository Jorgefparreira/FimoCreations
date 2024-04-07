import React, { Component } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import ViewCart from "./view_cart";
import { Outlet } from "react-router-dom";

class MainView extends Component {
  render() {
    return (
      <div>
        <ViewCart />
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  }
}

export default MainView;
