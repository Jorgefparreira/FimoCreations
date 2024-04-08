import React, { Component } from "react";
import { auth, provider } from "../Firebase";
import { signInWithPopup, signOut } from "firebase/auth";


class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }

  login() {
    try {
      signInWithPopup(auth,provider);
      } catch (err){
        console.error(err);
      }
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            {this.state.user ? (
              <button
                className="d-block mx-auto btn btn-info text-white"
                onClick={this.logout}
              >
                Log Out
              </button>
            ) : (
              <button
                className="d-block mx-auto btn btn-info text-white"
                onClick={this.login}
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
