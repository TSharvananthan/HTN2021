import React, { useState } from 'react';
import useSearchReviews from '../hooks/useSearchReviews';
import '../styles/reviews.css';

import { Card } from "../components/index"


export const Reviews = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');

  const {
    data,
    status,
    refetch: fetchReviews,
  } = useSearchReviews(
    { name, location: city, pageSize: 100 },
    { enabled: false, onSuccess: data => console.log(data.reviews) }
  );

  const handleSubmit = e => {
    e.preventDefault();
    fetchReviews();
  };
  return (

    <div id="review">
      <div className="container">
        <h1 className="title text-center">Find reviews</h1>
      
          <div className="wrapper">
       
            <section role="search" className="search grid-item">
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
                  <small
                    id="emailHelp"
                    className="form-text text-muted"
                  ></small>
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
          
            <Card></Card></div>
          </div>
  

      </div>
    </div>
  );
};

export default Reviews;
