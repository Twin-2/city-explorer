import axios from 'axios';
import React from 'react';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      locationData: {},
      formInput: ''
    }
  }

    handleInput = (e) => {
      e.preventDefault();
      this.setState({formInput: e.target.value})
    }

    getLocation = async () => {
      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_ACCESS_KEY}&q=${this.state.formInput}&format=json`;
      const response = await axios.get(API);
      console.log(response.data)
      this.setState({ locationData: response.data[0]})
    }

  render(){
    return(
      <>
      <input type="text" onChange={this.handleInput} placeholder='Enter City Name Here'></input>
      <Button varient="primary" onClick={this.getLocation}>Explore!</Button>
      <h1>Latitude: {this.state.locationData.display_name}</h1>
      <p>Latitude: {this.state.locationData.lat}</p>
      <p>Longitude: {this.state.locationData.lon}</p>
      </>
    )
  }
}


export default App;
