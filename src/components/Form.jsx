import React from 'react';
import { Button } from 'react-bootstrap'


class Form extends React.Component {

    render() {
        return (
            <div>
                <input type="text" onChange={this.props.handleInput} placeholder='Enter City Name Here'></input>
                <Button varient="primary" onClick={this.props.getLocation}>Explore!</Button>
            </div>
        )
    }
}

export default Form;