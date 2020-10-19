import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

const MovieTile = (props) => {

    const movie = props.movie;
    const [_redirectState, _updateRedirectState] = useState({
        redirect: null
    })

    const showSingleMovie = (selectedMovie) => {
        const address = {pathname: "/movies", search:"id=" +  selectedMovie.id};
        const r = <Redirect push to={address} />
        _updateRedirectState({redirect: r})

    }


    if(_redirectState.redirect !== null) {
        return _redirectState.redirect;
    }
    else
    return(
        
        <div className="movie-tile">
            <img src="./ddd.jpg" alt="movie poster" />
            <h4>Title: {movie.title}</h4>
            <h4>Actors: {movie.actors}</h4>
            <p>Description: {movie.description}</p>

            <button className="button" onClick={() => showSingleMovie(movie)}>More</button>

        </div>
    );
}

export default MovieTile;