import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App] constructor");
    this.state = {
      postcode: "LE50QA", //default. change this with user input
      nearbyCinemas: []
    }
  }

  //all cinemas objects nearby
  getNearbyCinemas = () => {
    fetch(`https://api.cinelist.co.uk/search/cinemas/postcode/LE50QA`)
    .then(data => data.json())
    .then(data => {
      this.setState({
        nearbyCinemas: data
      });
    });
  }


  getNearbyMovies = () => {
    var cinemaIds = [];
    this.state.nearbyCinemas.cinemas.forEach(element => {
      cinemaIds.push(element.id);
    });
    fetch(`https://api.cinelist.co.uk/get/times/many/` + cinemaIds.join(","))
    .then(data => data.json())
    .then(data => {
      console.log(data);
    })
  }

  

  componentDidMount() {
    this.getNearbyCinemas();
   
  }

  componentDidUpdate() {
    this.getNearbyMovies();
  }
  render () {
    //console.log(this.state);
    return (
      <div>
        
      </div>
    )
  }
}

export default App;
