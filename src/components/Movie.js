import React, { Component } from "react";
//tmdbapikey: 2ca7f95a77ff82974f6799d4ad26b7c8
//tmdb: https://api.themoviedb.org/3/search/movie?api_key=2ca7f95a77ff82974f6799d4ad26b7c8&language=en-US&query=Toy%20Story%204&page=1&include_adult=false
//https://api.themoviedb.org/3/movie/301528?api_key=2ca7f95a77ff82974f6799d4ad26b7c8&language=en-US&append_to_response=videos

class Movie extends Component {
  constructor(props) {
    super(props);
    console.log("[Movie] constructor");
    this.state = {
      movie: {}
    };
  }
  render() {
    return (
      <div className="movie-container">
        <h2>{this.props.name}</h2>
      </div>
    );
  }

  getMovieInfo(props) {
    fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=" +
        "2ca7f95a77ff82974f6799d4ad26b7c8" +
        "&language=en-US&query=" +
        this.props.name.replace(/ /g, "+") +
        "&page=1&include_adult=false"
    )
      .then(data => data.json())
      .then(data => {
        //console.log(data.results[0].title);
        this.setState(state => ({
          movie: data.results[0]
        }));
      })
      .then(data => {
        fetch(
          "https://api.themoviedb.org/3/movie/" +
            this.state.movie.id +
            "?api_key=2ca7f95a77ff82974f6799d4ad26b7c8" +
            "&language=en-US&append_to_response=videos"
        )
          .then(data => data.json())
          .then(data => {
            console.log(data);
          });
      });
  }

  componentDidMount() {
    this.getMovieInfo();
  }
}

export default Movie;
