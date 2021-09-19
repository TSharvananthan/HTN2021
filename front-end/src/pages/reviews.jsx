import React from "react";
import "../styles/reviews.css";
export const Reviews = () => {
  return (
    <div id="review">
      <div class="container">
              <h1 className="title text-center">Find reviews</h1>
              <div class="search-container">
        <section role="search" className="search">
  
                       <form>
  <div className="form-group">
    <label for="exampleInputEmail1">Company (optional)</label>
    <input className="w-100" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter company"></input>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">City (optional)</label>
    <input type="email" className="form-control w-100" id="exampleInputPassword1" placeholder="Enter city"></input>
  </div>
  
  <button type="submit" className="btn btn-primary w-100 mt-4">Submit</button>
</form>




        </section></div>
      </div>
    </div>
  );
};

export default Reviews;
