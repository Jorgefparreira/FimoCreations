import React, { Component } from "react";
// eslint-disable-next-line
import { BrowserRouter as Route, Link } from "react-router-dom";
// import MetaTags from "react-meta-tags";
import HOMEPAGESVG from "../assets/svg/homepageSVG";
// import Store from "../pages/store";

class Homepage extends Component {

  render() {
    return (
      <section id="homepage">
        {/* <MetaTags>
          <title>Lil Fimo Creations</title>
          <meta
            name="description"
            content="I started making little keyrings out of fimo in 2014 to raise funds to fly to New York and attend The Musical Saw Festival in Astoria. I made the plane fare and enough to buy a new cello bow for my musical saw. It was pretty fun making the little guys too, so when I got back from New York I decided to keep going."
          />
        </MetaTags> */}
        <div className="container">
          <div className="row">
            <div className="col-md-12" style={{position:'relative'}}>
              <HOMEPAGESVG />
              <Link to="/store"><button className="btn z-depth-3" id="homepage-store-btn">Go to Store</button></Link>
            </div>
          </div>
        </div>
        {/* <Route path="/store" component={Store} /> */}
      </section>
    );
  }
}

export default Homepage;
