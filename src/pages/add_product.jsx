import React from "react";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from "firebase/firestore";
import { db, storage, auth } from "../Firebase";
class AddProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      admin: null,
      id: "",
      name: "",
      description: "",
      price: "",
      type: "",
      imageName: ""
    };
    this.setRef = ref => {
      this.file = ref;
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        if (user.auth.email === process.env.REACT_APP_ADMIN_EMAIL) {
          this.setState({ admin: true });
        }
      }
    });
  }

  updateInput = e => {
    this.setState({
      [e.target.id]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.description]: e.target.value,
      [e.target.price]: e.target.value,
      [e.target.type]: e.target.value
    });
  };

  uploadImage = event => {
    const image = this.file.files[0];
    this.setState({ imageName: image.name })
  }

  addProduct = async e => {
    e.preventDefault();

    if (this.state.admin) {
      const image = this.file.files[0];
      const imageRef = ref(storage, `${image.name}`);
      const uploadImage = await uploadBytesResumable(imageRef, this.file.files[0]);
      const publicImageUrl = await getDownloadURL(imageRef);

      const collectionRef = collection(db, 'items');

      try {
        const docRef = await addDoc(collectionRef, {
          id: this.state.id,
          name: this.state.name,
          images: [publicImageUrl],
          description: this.state.description,
          price: parseFloat(this.state.price),
          type: this.state.type
        });
        console.log("Document written with ID: ", docRef.id)
      } catch (error) {
        console.error(error);
      }

      this.setState({
        id: "",
        name: "",
        description: "",
        price: "",
        type: "",
        imageName: ""
      });
    }

  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <form onSubmit={this.addProduct} id="add-product-form">
              <div className="form-group">
                <input
                  type="text"
                  name="id"
                  placeholder="ID"
                  onChange={this.updateInput}
                  value={this.state.id}
                  className="form-control"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={this.updateInput}
                  value={this.state.name}
                  className="form-control"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="upload-img1-btn" className="upload-img-label btn btn-success">
                  <input id="upload-img1-btn" type="file" className="upload-img-btn" ref={this.setRef} onChange={this.uploadImage} />
                  Img Choose File
                </label> &nbsp;&nbsp;
                <p>{this.state.imageName}</p>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  onChange={this.updateInput}
                  value={this.state.description}
                  className="form-control"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  onChange={this.updateInput}
                  value={this.state.price}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="type"
                  placeholder="Type"
                  onChange={this.updateInput}
                  value={this.state.type}
                  className="form-control"
                  required
                />
              </div>

              <button className="btn btn-info" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default AddProduct;
