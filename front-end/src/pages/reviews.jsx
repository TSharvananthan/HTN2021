import React, { useState } from "react";
import useSearchReviews from "../hooks/useSearchReviews";
import "../styles/reviews.css";
import ClipLoader from "react-spinners/ClipLoader";
import { Card } from "../components/index";

export const Reviews = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const {
    data,
    status,
    refetch: fetchReviews,
  } = useSearchReviews(
    { name, location: city, pageSize: 100 },
    { enabled: false, onSuccess: (data) => console.log(data.reviews) }
  );

  const search_results = Object.values(data ? data : {}); // Converts data object into array to iterate

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchReviews();
  };

  const Loading = () => {
    return (
      <div
        style={{ margin: "0 auto", display: "block", alignSelf: "center" }}
        className="col-md-1 col-md-offset-3"
      >
        <div className="sweet-loading">
          <ClipLoader color="#ffffff" loading={status.loading} size={60} />
        </div>
      </div>
    );
  };
  const Error = () => {
    return (
      <p className="text-center">
        Oops! Sorry, looks like an error has occured...
      </p>
    );
  };

  const Success = () => {
    return (
      <>
        <div class="success-checkmark">
          <div class="check-icon">
            <span class="icon-line line-tip"></span>
            <span class="icon-line line-long"></span>
            <div class="icon-circle"></div>
            <div class="icon-fix"></div>
          </div>
        </div>
        <center>
          <button id="restart">Restart Animation</button>
        </center>
      </>
    );
  };

  return (
    <div id="review">
      <div className="container">
        <h1 className="title text-center">Find reviews</h1>

        <div className="search-container">
          <section role="search" className=" grid-item search">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="exampleInputEmail1">Company (optional)</label>
                <input
                  className="w-100"
                  className="form-control"
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  aria-describedby="emailHelp"
                  placeholder="Enter company"
                />
                <small id="emailHelp" className="form-text text-muted"></small>
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">City (optional)</label>
                <input
                  type="text"
                  className="form-control w-100"
                  onChange={(e) => setCity(e.target.value)}
                  id="city"
                  placeholder="Enter city"
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-4">
                Submit
              </button>
            </form>
          </section>

          <div className="grid-item">
            <Loading></Loading>
            {/* {status && status.loading && <Loading></Loading>}
            {status && status.success && <Success></Success>}
            {status && status.error && <Error></Error>} */}
            {search_results &&
              search_results.map((business_info, index) => {
                return <Card key={index} props={business_info}></Card>;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
