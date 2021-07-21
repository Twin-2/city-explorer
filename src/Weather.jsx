import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Weather extends React.Component {

    render() {
        return (
            <div>
                <Table bordered id='test'>
                    <thead>
                        <tr >
                            <th colSpan='2'>Weather Forecast</th>
                        </tr>
                    </thead>
                    {this.props.forecast.map((value, idx) =>
                        <tbody>
                            <tr>
                                <td>{value.date}</td>
                                <td>{value.description}</td>
                            </tr>

                        </tbody>
                    )}
                </Table>
            </div>
        )
    }


}


export default Weather;
