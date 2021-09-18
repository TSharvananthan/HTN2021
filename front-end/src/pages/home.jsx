import React from "react";
import "../styles/home.css";

export const Home = () => {
    return (
      <>
        <section className="text-center" id="home">
          <div class=" container grid justify-content-center">
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
                businesses, save money, and get instant feedback...
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
          </div>
        </section>

        <section className="text-center section-b">
          <div className="img-bg"></div>
          <div class=" container content">
            <h2 class="pb-5">How it works</h2>
            <p>
              Enter the name of the business and see a list of reviews that are
              simplified and classified as positive or negative!
              <a> Try it out now! </a>
            </p>
            <p>
              To receive feedback from a review you can visit FeedBack section
              to write an anonymnous review and our machine learning model will
              do some cool tricks and give back a feedback of a sentimental
              analysis of the review. <a> Try it out now! </a>
            </p>
          </div>
        </section>
        <section className="text-center section-c">
          <div class=" container ">
            <h2 class="pb-5">Inspiration</h2>
            <p>
              Every year, hundreds of thousands of new businesses open up, but
              how do businesses know how customers are feeling? It takes time
              to find the right views and often there is ambiguity. This brought
              us an idea to help business and as welll as customers to have an
              app to find lots of views that are simplified with no more
              wondering how a customer feel, and allows others to find the service they need
              for their family and friends.
            </p>
          </div>
        </section>
        <section className="text-center section-d">
          <div className="img-bg"></div>
          <div class=" container content">
            <h2 class="pb-5">About us</h2>
            <p>
                        We are a team of developers  a fullstack developer, a machine learning engineer,
                        fullstack developer, machine learning and front-end developer 
            </p>
            <p>
              We recognize that a lot of the tools available pre-covid such as
              mock interviews and in-person workshops are no longer available.
              So, we created InterviewBuddy at StormHacks 2021. An online tool
              that provides feedback to the answers you give during the one-way
              interview.
            </p>
          </div>
        </section>
      </>
    );
};
export default Home;
