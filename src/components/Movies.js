import React, { Component } from "react";
import Movie from "./Movie";

class Movies extends Component {
  render() {
    return this.props.movies.map(movie => {
      return <Movie name={movie} />;
    });
  }
}

export default Movies;
