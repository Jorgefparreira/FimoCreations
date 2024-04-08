import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Admin extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Admin Area</h1>
          </div>
          <div className="col-3">
            <Link
              className="nav-link btn btn-info d-block mx-auto"
              to="/add-product"
            >
              Add Product
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
