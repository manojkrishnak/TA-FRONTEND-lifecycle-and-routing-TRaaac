import React from "react";
import Loader from "./Components/Loader";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personData: {},
      hover: "name",
      loaded: true,
    };
  }

  componentDidMount() {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          personData: data.results[0],
        });
      });
  }

  handleNewUser = () => {
    this.setState({ loaded: false });
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          personData: data.results[0],
          loaded: true,
        });
      });
  };

  handleMouseEnter = (key) => {
    this.setState({
      hover: key,
    });
  };

  handleMouseOut = (key) => {
    this.setState({
      hover: "name",
    });
  };

  getDetails = (key) => {
    switch (key) {
      case "email":
        return this.state.personData.email;
      case "age":
        return this.state.personData.dob.age;
      case "street":
        return (
          this.state.personData.location.street.number +
          " " +
          this.state.personData.location.street.name
        );
      case "phone":
        return this.state.personData.phone;
      case "password":
        return this.state.personData.login.password;
      default:
        return (
          this.state.personData.name.title +
          " " +
          this.state.personData.name.first +
          " " +
          this.state.personData.name.last
        );
    }
  };

  render() {
    if (Object.keys(this.state.personData).length === 0) {
      return (
        <div className="container loader-body flex justify-ct align-ct">
          <Loader />
        </div>
      );
    }

    return (
      <div className="app">
        <div className="row-1-2"></div>
        <div className="row-2-2"></div>
        <div className="card">
          <div className="card-header"></div>
          <div className="card-body">
            <figure className="profile-pic">
              <img
                src={this.state.personData.picture.large}
                alt={this.state.name}
              />
            </figure>
            <div className="name">
              <p className="text">My {this.state.hover} is</p>
              <p className="details">{this.getDetails(this.state.hover)}</p>
            </div>
            <div className="icons flex justify-bt">
              <i
                className="fas fa-user fa-lg"
                onMouseEnter={() => this.handleMouseEnter("name")}
                onMouseOut={this.handleMouseOut}
              ></i>
              <i
                className="fas fa-envelope-open fa-lg"
                onMouseEnter={() => this.handleMouseEnter("email")}
                onMouseOut={this.handleMouseOut}
              ></i>
              <i
                className="fas fa-passport fa-lg"
                onMouseEnter={() => this.handleMouseEnter("age")}
                onMouseOut={this.handleMouseOut}
              ></i>
              <i
                className="fas fa-address-card fa-lg"
                onMouseEnter={() => this.handleMouseEnter("street")}
                onMouseOut={this.handleMouseOut}
              ></i>
              <i
                className="fas fa-phone fa-lg"
                onMouseEnter={() => this.handleMouseEnter("phone")}
                onMouseOut={this.handleMouseOut}
              ></i>
              <i
                className="fas fa-lock fa-lg"
                onMouseEnter={() => this.handleMouseEnter("password")}
                onMouseOut={this.handleMouseOut}
              ></i>
            </div>
            <div className="flex justify-ct align-ct">
              <button className="random-btn" onClick={this.handleNewUser}>
                {this.state.loaded && "RANDOM USER"}
                {!this.state.loaded && <Loader />}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
