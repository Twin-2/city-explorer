import axios from 'axios';
import React from 'react';
import {Button, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Weather from './Weather.jsx';
import Movie from './movie';
import LocationInfo from './LocationInfo.jsx';

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

    getLocationInfo = async () => {
        const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_KEY}&q=${this.state.formInput}&format=json`;
        const response = await axios.get(API);
        this.setState({ locationData: response.data[0]})
    }

    getMap = async () => {
        const MAP = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_KEY}&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=12`;
        const mapResponse = await axios.get(MAP);
        this.setState({ map: mapResponse.config.url, showAlert: false})
    }

    //https://city-explorer-api-dw.herokuapp.com
    //http://localhost:3333
    getWeather = async () => {
      const query = `https://city-explorer-api-dw.herokuapp.com/weather?lat=${this.state.locationData.lat}&lon=${this.state.locationData.lon}`;
      const weatherResponse = await axios.get(query)
      this.setState({forecastData: weatherResponse.data})
    }

    getMovies = async () =>{
      const movieQuery = `https://city-explorer-api-dw.herokuapp.com/movies?searchQuery=${this.state.formInput}`
      const getMovies = await axios.get(movieQuery)
      console.log(getMovies.data)
      this.setState({movies: getMovies.data})
    }

    getLocation = async (e) => {
      e.preventDefault();
      try{
        this.getLocationInfo()
          .then(()=>{
            this.getMap();
            this.getWeather();
            this.getMovies();
          })
      }
      catch(error){
        this.setState({errors: error.response.status, showAlert: true, map: '', locationData: {}, forecastData: [], movies: []})
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

        <div id='flexContainerMainContent'>
          <div id='flexItemLocationInfo'>
            <LocationInfo map={this.state.map} locationData={this.state.locationData}/>
          </div>
          <div id='flexItemWeatherInfo'>
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

