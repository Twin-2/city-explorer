import React from 'react';
import { Image } from 'react-bootstrap';

class LocationInfo extends React.Component {

    render() {
        return (
            <div>
                <h1>{this.props.locationData.display_name}</h1>
                <p>Latitude: {this.props.locationData.lat}</p>
                <p>Longitude: {this.props.locationData.lon}</p>
                <Image id='mapImage' src={this.props.map} rounded />
            </div>
        )
    }
}


export default LocationInfo;