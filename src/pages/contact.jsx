import React, { Component } from "react";
// import MetaTags from "react-meta-tags";
import PaperPlane from "../assets/svg/paper_plane";
import ContactPic from "../assets/kawaii_keyrings.jpg";

class Contact extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: "",
      phone: "",
      email: "",
      message: "",
      displayErrors: "",
      displayThanks: ""
    };
  }
  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.phone]: e.target.value,
      [e.target.email]: e.target.value,
      [e.target.message]: e.target.value
    });
  };

  componentDidMount() {
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      this.setState({ displayErrors: "displayErrors" });
      return;
    }
    this.setState({ displayErrors: "" });


    fetch(process.env.REACT_APP_FUNCTION_CONTACT_MAILER_ADDRESS, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        message: this.state.message
      })
    })
      .then((response) => {
        if(response?.ok){
          this.setState({
            name: "",
            phone: "",
            email: "",
            message: ""
          });
        } else {
          console.error('error')
        }
      });
  };

  handleClick = () => {
    this.setState({
      displayThanks: "",
      displayErrors: false
    });
  };

  render() {
    return (
      <section id="contact">
        {/* <MetaTags>
          <title>Contact || Lil Fimo Creations</title>
          <meta name="description" content="Get in touch" />
        </MetaTags> */}
        <div className="header">
          <h2 className="text-center h1 contact-title">Contact</h2>
        </div>
        <div className={this.state.displayErrors}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div
                  className={`alert alert-success alert-dismissible fade show ${
                    this.state.displayThanks
                  }`}
                  role="alert"
                >
                  <p>Thank you for you message.</p>
                  <p>I will be in contact shortly.</p>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={this.handleClick}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div
                  className="alert alert-danger alert-dismissible fade show error-message"
                  role="alert"
                >
                  <p>Please fill all the required fields</p>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={this.handleClick}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="xs-reverse">
                <div className=" col-sm-12 col-md-6 col-lg-7 get-in-touch">
                  <form
                    onSubmit={this.handleSubmit}
                    id="contact-us-form"
                    noValidate
                  >
                    <div className="form-group">
                      <label htmlFor="name" className="sr-only">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Name*"
                        required
                        className="form-control"
                        id="name"
                        name="name"
                        onChange={this.updateInput}
                        value={this.state.name}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone" className="sr-only">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        placeholder="Phone number"
                        pattern="[0-9]{6,}"
                        className="form-control"
                        id="phone"
                        name="phone"
                        onChange={this.updateInput}
                        value={this.state.phone}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Email*"
                        required
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={this.updateInput}
                        value={this.state.email}
                      />
                    </div>
                    <label htmlFor="message-box" className="sr-only">
                      Message
                    </label>
                    <textarea
                      placeholder="Message*"
                      cols="40"
                      rows="5"
                      minLength="2"
                      required
                      className="form-control"
                      id="message-box"
                      name="message"
                      onChange={this.updateInput}
                      value={this.state.message}
                      data-gramm_editor="false"
                    />

                    <button
                      type="submit"
                      value="Send"
                      className="btn active-btn"
                      id="submit-button"
                    >
                      <PaperPlane></PaperPlane>&nbsp;
                      Submit
                    </button>
                    
                  </form>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-5 ">
                  <img
                    src={ContactPic}
                    className="img-fluid side-img"
                    alt="Kawaii fimo keyrings"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;
