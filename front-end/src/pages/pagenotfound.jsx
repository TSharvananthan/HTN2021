import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as PageNotFoundIcon } from "../images/page_not_found.svg"
import "../styles/pagenotfound.css";


export const PageNotFound = () => {
  return (
    <div>
      <PageNotFoundIcon className="page-not-found-icon"/>
    </div>
  )
}