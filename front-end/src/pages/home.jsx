import React from "react";
import "../styles/home.css";
export const Home = () => {
  return (
    <section className="grid text-center justify-content-center" id="home">
      <div></div>
      <div className="content-container">
        <h1>
          Find reviews instantly with <span className="text-primary">AI</span>
        </h1>
        <p>
          Simplifying customer reviews for you so you can find the best
          restaurant, save money, and get instant feedback...
        </p>
        <form class="form-inline my-2 my-lg-0">
          <button type="button" class="btn btn-primary my-2 my-sm-0 btn-lg btn-block w-100" type="submit">
            Start searching
          </button>
        </form>
      </div>
      <div></div>
    </section>
  );
};
export default Home;
