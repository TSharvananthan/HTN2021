import React from 'react'
import "../styles/card.css"
export const Card = (props) => {

    //review_state = props.classifier ==0? 'negative-review' : 'positive-review'

    return (
      <div class="card  positive-review card-container">
        <div class="card-body">
          <p class="card-date date">{props.date.substring(0,10)}</p>
          <p class="card-text review-text">
            {props.text}
          </p>
        </div>
      </div>
    );

}

export default Card;

//text ,date 