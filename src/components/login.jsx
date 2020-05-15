import React, { Component } from "react";
import Services from "./services";
import { NavLink, Switch, Redirect, Link, Route, BrowserRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: "",
      show: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  contactSubmit(e) {
    e.preventDefault();
    this.handleValidation();
  }

  handleValidation() {
    let errors = "";
    // let isValid = true;

    //Email
    if (!this.state.email || !this.state.password) {
      // isValid = false;
      errors = "Enter valid information";
    }

    // if (typeof fields["email"] !== "undefined") {
    //   let lastAtPos = fields["email"].lastIndexOf('@');
    //   let lastDotPos = fields["email"].lastIndexOf('.');

    //   if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
    //     isValid = false;
    //     errors["email"] = "Email is not valid";
    //   }
    // }


    // if (typeof fields["password"] !== "undefined") {
    //   if (!fields["password"].match(/^[a-zA-Z]+$/)) {
    //     isValid = false;
    //     errors["password"] = "Only letters";
    //   }
    // }

    this.setState({ errors: errors, show: true });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value
    const name = target.name;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="row align-items-center h-100">

        <div className="col-md-12 mx-auto">
          <div className="jumbotron">
            <div className="col-md-12">
              <div className={"msg" + (this.state.errors === "" ? ' msg--green' : ' msg--red') + (this.state.show ? ' show' : ' show--no')} role="alert">
                {(this.state.errors === "" ? 'Success!' : 'Error! - ' + this.state.errors)}
              </div>
            </div>

            <div className="card mb-3 mx-width mx-auto">
              {/* <div className="card-header bg-transparent">Header</div> */}
              <div className="card-body">
                <h5>Log in</h5>
                <form onSubmit={this.contactSubmit.bind(this)}>
                  <div className="input-group mb-3">
                    <input type="text" name="email" className="form-control border-right-0" placeholder="Email" aria-label="from" aria-describedby="from" onChange={this.handleInputChange} value={this.state.email}></input>
                    <div className="input-group-append">
                      <span className="input-group-text bg-transparent">
                        <i className="fa fa-user"></i>
                      </span>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input type="password" name="password" className="form-control border-right-0" placeholder="Password" aria-label="from" aria-describedby="from" onChange={this.handleInputChange} value={this.state.password}></input>
                    <div className="input-group-append">
                      <span className="input-group-text bg-transparent">
                        <i className="fa fa-lock"></i>
                      </span>
                    </div>
                  </div>
                  <button type="submit" className="button button--blue button--md mb-3">Submit</button>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="check"></input>
                    <label className="form-check-label">Remember</label>
                  </div>
                </form>
              </div>
              {/* <div className="card-footer bg-transparent">Footer</div> */}
            </div>

            <div className="col-md-12">
              <h6 className="title">
                <a href="{#}" className="text-decoration-none title__link">
                  Need an account?
                <small className="text-muted"> Register</small>
                </a>
              </h6>

              <h6 className="title">
                <a href="{#}" className="text-decoration-none title__link title__link--md">
                  Forgot password?
                  <small className="text-muted"> Click Here</small>
                </a>
              </h6>
            </div>


          </div>

          <div className="col-md-12">
            <h6>Services</h6>
            <Services />
          </div>

        </div>
      </div>
    );
  }
}
export default Login;