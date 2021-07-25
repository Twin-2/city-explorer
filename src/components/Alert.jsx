import React from 'react';
import { Alert, Button } from 'react-bootstrap';


class AlertComponent extends React.Component {

    render() {
        return (
            <div>
                <Alert
                    show={this.props.show}
                    variant='warning'>
                    Error code {this.props.errors}: unable to geocode
                    <Button variant="warning" onClick={() => this.props.hideAlert()}>Close</Button>
                </Alert>
            </div>
        )
    }
}


export default AlertComponent;