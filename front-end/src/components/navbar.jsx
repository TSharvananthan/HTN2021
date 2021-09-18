import React from "react";
import "../styles/navbar.css";
export const Navbar = () => {
  return (
    <div id="nav" className="nav w-100 h-50">
      <div className="container">
        <div className=" navbar nav ">
          <p className="text-light">
            Review<span className="text-primary">AI</span>
          </p>
          <ul className="d-flex flex-row">
            <li className="nav-item nav-link">
              <a className="text-light" href="#">
                How it works
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Inspiration
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">About us</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <button class="btn btn-primary my-2 my-sm-0" type="submit">
              Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
