import React from 'react';
import { Card } from 'react-bootstrap'

class Movie extends React.Component {
    render() {
        return (
            <div>
                {this.props.movies.map((value, idx) =>
                    <Card key={idx} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={value.imageUrl} />
                        <Card.Body>
                            <Card.Title>{value.title}</Card.Title>
                            <Card.Text>
                                <p>Overview: {value.overview}</p>
                                <p>Votes: {value.votes}</p>
                                <p>Populatiry: {value.popularity}</p>
                                <p>Release Date:{value.releasedOn}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>)

                }
            </div>
        )
    }
}


export default Movie;