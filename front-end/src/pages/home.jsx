import React from "react";
import "../styles/home.css";
export const Home = () => {
    return (
      <>
        <section className="grid text-center justify-content-center" id="home">
          <div></div>
          <div className="content-container">
            <div class="proto-container">
              <div class="proto"></div>
              <div class="proto"></div>
              <div class="proto"></div>
            </div>
            <h1>
              Find reviews instantly with{" "}
              <span className="text-primary">AI</span>
            </h1>
            <p>
              Simplifying customer reviews for you so you can find the best
              restaurant, save money, and get instant feedback...
            </p>
            <form class="form-inline my-2 my-lg-0">
              <button
                type="button"
                class="btn btn-primary my-2 my-sm-0 btn-lg btn-block w-100"
                type="submit"
              >
                Start searching
              </button>
            </form>
          </div>
          <div></div>
        </section>

        <section className="text-center">
          <h2>How it works</h2>
          <p>
            Enter the address of a restaurant and see a list of reviews that are
            simplified and classified as positive or negative!
            <a> Try it out now! </a>
          </p>
          <p>
            To receive feedback from a review you can visit FeedBack section to
            write an anonymnous review and our machine learning model will do
            some cool tricks and give back a feedback of a sentimental analysis
            of the review. <a> Try it out now! </a>
          </p>
        </section>
      </>
    );
};
export default Home;
