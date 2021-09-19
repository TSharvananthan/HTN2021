import React from 'react'
import "../styles/card.css"
export const Card = (props) => {

    //review_state = props.classifier ==0? 'negative-review' : 'positive-review'

    return (
      <div class="card  positive-review card-container">
        <div class="card-body">
          <p class="card-date date">Card date</p>
          <p class="card-text review-text">
            Some quick example text to btuild on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    );

}

export default Card;

//text ,date 