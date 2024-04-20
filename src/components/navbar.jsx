import React, { Component } from "react";
import { BrowserRouter as Routes, Route, Link } from "react-router-dom";
import { auth } from "../Firebase";
import "../styles/navbar.scss";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      admin: null,
      width: window.innerWidth,
      showDropdown: "",
      titleDropdown: "",
      hamburgerDropdown: ""
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        if (user.auth.email === process.env.REACT_APP_ADMIN_EMAIL) {
          this.setState({ admin: true });
        }
      }
    });
    this.setState({ width: window.innerWidth });
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleClick() {
    if (this.state.width < 992) {
      this.setState({
        iconBar1: "hamburgerAni-icon-bar1",
        iconBar2: "hamburgerAni-icon-bar2"
      });
      setTimeout(
        function () {
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

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    return (
      <section id="top-navbar" >
        <button
          className={`navbar-toggler ${this.state.hamburgerDropdown}`}
          type="button"
          onClick={() => this.handleClick()}
        >
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
              {this.state.admin &&
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>}
            </ul>
          </div>
        </nav>
      </section>
    );
  }
}

export default Navbar;
