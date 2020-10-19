import React from 'react';


const SingleMovie = (props) => {

    const movie = props.movie;
    return(
        <div>
        <h4>Detail of the movie</h4>
        <img src="./ddd.jpg" alt="movie poster" />
        <h4>Title: {movie.title}</h4>
        <h4>Actors: {movie.actors}</h4>
        <p>Description: {movie.description}</p>
 
        <button className="button">Rent</button>
        </div>
    );
}

export default SingleMovie;