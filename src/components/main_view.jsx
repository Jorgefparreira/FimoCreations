import React, { Component } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import ViewCart from "./view_cart";
import { Outlet } from "react-router-dom";

class MainView extends Component {
  constructor() {
    super();
    this.state = {
      minHeight: 0
    };
  }

  componentDidMount() {
    this.setMinHeight()

    window.addEventListener("resize", this.handleWindowSizeChange);
    window.addEventListener("load", this.handleLoad);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  setMinHeight(){
    const height = window.innerHeight - 57.55 + "px";
    this.setState({ minHeight: height });
  }

  handleWindowSizeChange = () => {
    this.setMinHeight()
  };
  

  render() {
    return (
      <div>
        <ViewCart />
        <div id="main-container" style={{ minHeight: this.state.minHeight }}>
          <Navbar />
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  }
}

export default MainView;
