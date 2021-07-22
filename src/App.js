import axios from 'axios';
import React from 'react';
import {Button, Image, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Weather from './Weather.jsx';
import Movie from './movie';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      locationData: {},
      formInput: '',
      map:'',
      showAlert: false,
      errors: '',
      forecastData: [],
      movies: []
    }
  }

    handleInput = (e) => {
      e.preventDefault();
      this.setState({formInput: e.target.value})
    }

    getLocation = async (e) => {
      e.preventDefault();
      try{
        const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_KEY}&q=${this.state.formInput}&format=json`;
        const response = await axios.get(API);
        this.setState({ locationData: response.data[0]})
        
        const MAP = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_KEY}&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=12`;
        const mapResponse = await axios.get(MAP);
        this.setState({ map: mapResponse.config.url, showAlert: false})

        // https://city-explorer-api-dw.herokuapp.com/weather
        const query = `https://city-explorer-api-dw.herokuapp.com/weather?lat=${this.state.locationData.lat}&lon=${this.state.locationData.lon}`;
        const weatherResponse = await axios.get(query)
        this.setState({forecastData: weatherResponse.data})

        // https://city-explorer-api-dw.herokuapp.com/movies
        const movieQuery = `http://localhost:3333/movies?searchQuery=${this.state.formInput}`
        const getMovies = await axios.get(movieQuery)
        console.log(getMovies.data)
        this.setState({movies: getMovies.data})
      }
      catch(error){
        this.setState({errors: error.response.status, showAlert: true, map: '', locationData: {}, forecastData: []})
      }
    }


  render(){
    return(
      <div id="contentBody">
        <Alert 
          show={this.state.showAlert} 
          variant='warning'>
          Error code {this.state.errors}: unable to geocode
          <Button variant="warning" onClick={()=>this.setState({showAlert: false})}>Close</Button>
        </Alert>

        <div id='exploreHeader'>
        <input type="text" onChange={this.handleInput} placeholder='Enter City Name Here'></input>
        <Button varient="primary" onClick={this.getLocation}>Explore!</Button>
        </div>

        <div id='flexContainer'>
          <div id='flexItem1'>
            <h1>{this.state.locationData.display_name}</h1>
            <p>Latitude: {this.state.locationData.lat}</p>
            <p>Longitude: {this.state.locationData.lon}</p>
            <Image id='mapImage' src={this.state.map} rounded/>
          </div>
          <div id='flexItem2'>
            {this.state.forecastData.length > 0 && <Weather forecast={this.state.forecastData}/>}
          </div>
        </div>

        <div>
          <Movie movies={this.state.movies}/>
        </div>

      </div>
    )
  }
}


export default App;

