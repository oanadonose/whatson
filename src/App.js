import React, { Component } from "react";
import "./App.css";
import "./components/Movie.css";
import Movies from "./components/Movies";
import "./fonts.css";

//tmdbapikey: 2ca7f95a77ff82974f6799d4ad26b7c8
//tmdb: https://api.themoviedb.org/3/movie/550?api_key=2ca7f95a77ff82974f6799d4ad26b7c8

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App] constructor");
    this.state = {
      postcode: "LE50QA", //default. change this with user input
      nearbyCinemas: [],
      nearbyMovies: [],
      movies: []
    };
  }

  //all cinemas objects nearby
  getNearbyMovies = () => {
    fetch(`https://api.cinelist.co.uk/search/cinemas/postcode/LE50QA`)
      .then(data => data.json())
      .then(data => {
        this.setState(state => ({
          nearbyCinemas: data
        }));
      })
      .then(data => {
        var cinemaIds = [];
        this.state.nearbyCinemas.cinemas.forEach(element => {
          cinemaIds.push(element.id);
        });
        fetch(
          `https://api.cinelist.co.uk/get/times/many/` + cinemaIds.join(",")
        )
          .then(data => data.json())
          .then(data => {
            this.setState(state => ({
              nearbyMovies: data.results
            }));
            data.results.forEach(cinema => {
              //console.log(cinema);
              cinema.listings.forEach(listing => {
                if (this.state.movies.includes(listing.title)) {
                  //do nothing. no duplicates
                } else {
                  this.setState(state => ({
                    movies: [...this.state.movies, listing.title]
                  }));
                }
              });
            });
          });
      });
  };

  componentDidMount() {
    this.getNearbyMovies();
  }

  componentDidUpdate() {}

  render() {
    //console.log(this.state);
    return (
      <div className="App">
        <Movies movies={this.state.movies}></Movies>
      </div>
    );
  }
}

export default App;
