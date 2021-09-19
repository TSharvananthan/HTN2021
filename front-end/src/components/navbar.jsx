import React from "react";
import "../styles/navbar.css";


export const Navbar = () => {
  return (<div id="nav" className="nav">
    <div className="container">
      <div className="navbar nav">
        <p className="text-light brand m-0">
          <span className="text-primary">Sentimentality</span>
        </p>

        {/* navigation links */}
        <ul className="d-flex flex-row mb-0">
          <li className="nav-link text-light">
            <a className="text-light bg-gray-link" href="#">
              How it works
            </a>
          </li>
          <li className="nav-link text-light bg-gray-link">
            <a className="text-light bg-gray-link" href="#">
              Inspiration
            </a>
          </li>
          <li className="nav-link">
            <a className="text-light bg-gray-link">About us</a>
          </li>
        </ul>

        <form className="form-inline my-2 my-lg-0">
          <button className="btn btn-primary my-2 my-sm-0" type="submit">
            Feedback
          </button>
        </form>
      </div>
    </div>
  </div>);
};
export default Navbar;
