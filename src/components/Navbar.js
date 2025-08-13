import React, { Component } from 'react';
import img from "./img/logo.jpg";
import { Link } from "react-router-dom";
export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }
  render() {
    const currentPath = window.location.pathname;
    return (
      <div className="h-90">
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body py-3 fs-5">
          <div className="container-fluid ">
            <div className='container-fluid'>
              <Link className="navbar-brand text-warning fw-bold " to="/">
                <img src={img} alt="Logo" width="35" height="30" className="d-inline-block align-text-top " />
                <span className='fs-3 px-2 align-middle'>Your News Destination</span>
              </Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <ul className="navbar-nav justify-content-center">
                  {[
                    { path: "/", label: "Home" },
                    { path: "/business", label: "Business" },
                    { path: "/entertainment", label: "Entertainment" },
                    { path: "/health", label: "Health" },
                    { path: "/science", label: "Science" },
                    { path: "/sports", label: "Sports" },
                    { path: "/technology", label: "Technology" },
                  ].map((item) => (
                    <li className="nav-item" key={item.path}>
                      <Link
                        className={`nav-link ${currentPath === item.path ? "text-danger fw-bold" : "text-white"}`}
                        to={item.path}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </ul>
            </div>
          </div>
        </nav>
      </div >
    );
  }
}
export default Navbar;
