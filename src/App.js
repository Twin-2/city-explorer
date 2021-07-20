import axios from 'axios';
import React from 'react';
import {Button, Image, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      locationData: {},
      formInput: '',
      map:'',
      showAlert: false,
      errors: ''
    }
  }

    handleInput = (e) => {
      e.preventDefault();
      this.setState({formInput: e.target.value})
    }

    getLocation = async (e) => {
      e.preventDefault();
      try{const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_ACCESS_KEY}&q=${this.state.formInput}&format=json`;
      const response = await axios.get(API);
      console.log(response.data)
      this.setState({ locationData: response.data[0]})
      
      const MAP = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_ACCESS_KEY}&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=12`;
      const mapResponse = await axios.get(MAP);
      console.log(mapResponse.config.url)
      this.setState({ map: mapResponse.config.url, showAlert: false})
      }
      catch(error){
        console.log(error.response.status)
        this.setState({errors: error.response.status, showAlert: true, map: '', locationData: {}})
      }
    }

  render(){
    return(
      <div id="contentBody">
        <Alert 
          show={this.state.showAlert} 
          variant='warning'
          // onClose={()=> this.setState({showAlert: false})}
          >
          Error code {this.state.errors}: unable to geocode
          <Button variant="warning" onClick={()=>this.setState({showAlert: false})}>Close</Button>
        </Alert>

        <input type="text" onChange={this.handleInput} placeholder='Enter City Name Here'></input>
        <Button varient="primary" onClick={this.getLocation}>Explore!</Button>
        <h1>{this.state.locationData.display_name}</h1>
        <p>Latitude: {this.state.locationData.lat}</p>
        <p>Longitude: {this.state.locationData.lon}</p>
        <Image src={this.state.map} rounded/>
      
        
      </div>
    )
  }
}


export default App;

