import React from 'react';

function SearchResults({ isLoading, isError, isSuccess, reviews }) {

  return (
    <div>
      Loading: {isLoading}
      <br />
      Error: {isError}
      <br />
      Success: {isSuccess}
      <br />
      {JSON.stringify(reviews)}
    </div>
  );
}

export default SearchResults;
