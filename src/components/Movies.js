import React, { Component } from "react";
import Movie from "./Movie";

class Movies extends Component {
  render() {
    console.log(this.props.movies);
    return this.props.movies.map(movie => {
      return <Movie name={movie} />;
    });
  }
}

export default Movies;
