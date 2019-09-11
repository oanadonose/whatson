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
      retrieveData: false
    };
  }

  showInfo = () => {
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
            <div className={"infographic" + " " + this.state.infoClick}></div>
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

        <i class="material-icons md-30 info-icon" onClick={this.showInfo}>
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
            this.setState({
              movieTMDB: data,
              trailer: videoUrl,
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
