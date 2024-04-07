import React, { Component } from "react";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 0
    };
  }

  componentDidMount() {
    const date = new Date();
    const year = date.getFullYear();
    this.setState({ year });
  }

  render() {
    return (
      <footer>
        <div className="container-fluid">
          <div className="row footer-row">
            <div className="col-md-6 col-sm-6 col-xs-5" id="copyright">
              <p>&copy;Lil Fimo Creations {this.state.year}</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
