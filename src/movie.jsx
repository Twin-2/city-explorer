import React from 'react';
import { Card } from 'react-bootstrap'

class Movie extends React.Component {
    render() {
        return (
            <div id='flexContainerMovies'>
                {this.props.movies.map((value, idx) =>
                    <Card bg='light' border='dark' id='flexItemMovies' key={idx} style={{ width: '23rem' }}>
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w185${value.imageUrl}?key=${process.env.REACT_APP_MOVIE_API_KEY}`} />
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