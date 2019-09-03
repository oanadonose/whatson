import React, { Component } from "react";
import Movie from "./Movie";

class Movies extends Component {
  render() {
    return this.props.movies.map(movie => {
      return (
        <div className="movies-container">
          <Movie name={movie} />
        </div>
      );
    });
  }
}

export default Movies;
