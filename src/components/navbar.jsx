import React, { Component } from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Homepage from "../pages/homepage";
import About from "../pages/about";
import Contact from "../pages/contact";
import Events from "../pages/events";
import Store from "../pages/store";
import Login from "../pages/login";
import ViewCart from "../components/view_cart";
import Admin from "../pages/admin";
import AddProduct from "../pages/add_product";
import { auth } from "../Firebase";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      admin: null,
      width: window.innerWidth,
      showDropdown: "",
      titleDropdown: "",
      hamburgerDropdown: "",
      minHeight: 0
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        if (user.email === process.env.REACT_APP_EMAIL) {
          this.setState({ admin: true });
        }
      }
    });
    const height = window.innerHeight - 61 + "px";
    this.setState({ minHeight: height });
    window.addEventListener("resize", this.handleWindowSizeChange);
    window.addEventListener("load", this.handleLoad);
  }

  handleWindowSizeChange = () => {
    const height = window.innerHeight - 61 + "px";
    this.setState({ minHeight: height });
  };

  handleClick() {
    if (this.state.width < 992) {
      this.setState({
        iconBar1: "hamburgerAni-icon-bar1",
        iconBar2: "hamburgerAni-icon-bar2"
      });
      setTimeout(
        function() {
          this.setState({ iconBar1: "", iconBar2: "" });
        }.bind(this),
        1000
      );
      this.setState(
        this.state.showDropdown === ""
          ? {
              showDropdown: "nav-dropdown-show",
              titleDropdown: "main-title-menu",
              hamburgerDropdown: "hamburder-dropdown"
            }
          : { showDropdown: "", titleDropdown: "", hamburgerDropdown: "" }
      );
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);  
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    return (
      <div id="main-container" style={{ minHeight: this.state.minHeight }}>
        <div>
          <Link className="login-link" to="/login" />
        </div>
        <button
          className={`navbar-toggler ${this.state.hamburgerDropdown}`}
          type="button"
          onClick={() => this.handleClick()}
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="hamburger-wrapper ">
            <span className={`icon-bar icon-bar1 ${this.state.iconBar1}`} />
            <span className={`icon-bar icon-bar2 ${this.state.iconBar2}`} />
            <span className={`icon-bar icon-bar1 ${this.state.iconBar1}`} />
          </div>
        </button>
        <h1 className={`main-title ${this.state.titleDropdown}`}>
          Lil Fimo Creations
        </h1>
        <nav className="navbar navbar-expand-lg nav">
          <div
            className={`collapse navbar-collapse ${this.state.showDropdown}`}
          >
            <ul className="navbar-nav">
              <div className="clearfix d-block d-sm-none">&nbsp;</div>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/"
                  onClick={() => this.handleClick()}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/about"
                  onClick={() => this.handleClick()}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/contact"
                  onClick={() => this.handleClick()}
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/store"
                  onClick={() => this.handleClick()}
                >
                  Store
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/events"
                  onClick={() => this.handleClick()}
                >
                  Events
                </Link>
              </li>
              {this.state.admin ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </nav>
        <div className="clearfix d-block d-sm-none">&nbsp;</div>
        <ViewCart />
        <Route exact path="/" component={Homepage} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/events" component={Events} />
        <Route path="/store" component={Store} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/add-product" component={AddProduct} />
      </div>
    );
  }
}

export default Navbar;
