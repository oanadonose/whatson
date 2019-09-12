import React, { Component } from "react";

import ReactPlayer from "react-player";

//tmdbapikey: 2ca7f95a77ff82974f6799d4ad26b7c8
//tmdb: https://api.themoviedb.org/3/search/movie?api_key=2ca7f95a77ff82974f6799d4ad26b7c8&language=en-US&query=Toy%20Story%204&page=1&include_adult=false
//https://api.themoviedb.org/3/movie/301528?api_key=2ca7f95a77ff82974f6799d4ad26b7c8&language=en-US&append_to_response=videos

class Movie extends Component {
  constructor(props) {
    super(props);
    console.log("[Movie] constructor");
    this.state = {
      movie: {},
      movieTMDB: {},
      trailer: "",
      infoClick: "off",
      rating: {},
      retrieveData: false
    };
  }

  toggleInfo = () => {
    console.log("info icon was clicked;");
    if (this.state.infoClick === "off") {
      this.setState({
        infoClick: "on"
      });
    } else {
      this.setState({
        infoClick: "off"
      });
    }
  };

  render() {
    if (this.state.retrieveData) {
      console.log(this.state.movieTMDB);
    }
    return (
      <div className="movie-container">
        {this.state.retrieveData &&
        this.state.movieTMDB.videos.results.length > 0 ? (
          <div className="video-container">
            <ReactPlayer
              className="video-player"
              width="640px"
              height="400px"
              url={"https://www.youtube.com/watch?v=" + this.state.trailer}
            ></ReactPlayer>
            <div className={"infographic" + " " + this.state.infoClick}>
              <h2>{this.state.movieTMDB.original_title}</h2>
              <p className="ig-title">{this.state.movieTMDB.overview}</p>
              <div className="ig-release">
                <i className="material-icons ig-release-icon">schedule</i>
                <h4 className="ig-release-status">
                  {this.state.movieTMDB.status +
                    " => " +
                    this.state.movieTMDB.release_date}
                </h4>
              </div>
              <svg viewBox="0 0 50 50">
                <path
                  className="circle"
                  d="M18 2.0845 
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={this.state.rating.color} //this.state.rating.color
                  stroke-width="2.5"
                  stroke-dasharray={this.state.rating.rating * 10 + ", 100"} //this.state.rating.rating
                />
                <text x="9" y="21.5" className="percentage">
                  {this.state.rating.rating}
                </text>
              </svg>
            </div>
          </div>
        ) : (
          <img
            className="poster"
            src={
              "https://image.tmdb.org/t/p/w500/" +
              this.state.movieTMDB.poster_path
            }
            alt={"movie poster of " + this.state.movieTMDB.original_title}
          />
        )}

        <i className="material-icons md-30 info-icon" onClick={this.toggleInfo}>
          info_outline
        </i>
      </div>
    );
  }

  getMovieInfo = props => {
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
        this.setState({
          movie: data.results[0]
        });
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
            //console.log(data);
            let videoUrl = "";
            data.videos.results.forEach(video => {
              if (video.type === "Trailer") {
                videoUrl = video.key;
              }
            });
            let ratingColor = "";

            const votes = data.vote_average;
            if (votes === 0) {
              ratingColor = "gray";
            } else if (votes > 0 && votes < 4.5) {
              ratingColor = "red";
            } else if (votes >= 5 && votes <= 7) {
              ratingColor = "yellow";
            } else {
              ratingColor = "green";
            }
            console.log("rating: " + votes + " " + ratingColor);
            this.setState({
              movieTMDB: data,
              trailer: videoUrl,
              rating: {
                color: ratingColor,
                rating: votes
              },
              retrieveData: true //data.videos.results[0].id
            });
          });
      });
  };

  componentDidMount() {
    //console.log("componentdidmount");
    this.getMovieInfo();
  }
}

export default Movie;
