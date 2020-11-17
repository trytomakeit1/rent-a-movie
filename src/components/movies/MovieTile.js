import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

const MovieTile = (props) => {

    const movie = props.movie;
    const [_redirectState, _updateRedirectState] = useState({
        redirect: null
    })

    const showSingleMovie = (selectedMovie) => {
        const address = {pathname: "/movies", search:"id=" +  selectedMovie._id};
        const r = <Redirect push to={address} />
        _updateRedirectState({redirect: r})

    }


    if(_redirectState.redirect !== null) {
        return _redirectState.redirect;
    }
    else
    {

        if(movie === null ){return null;}

        else {
            let genresList = [];
            let movieGenres = movie.genres.split(",");
            if(movieGenres) {
                genresList = movieGenres.map((el, index)=> {
                    if (index < movieGenres.length - 1)
                        return el + ", "
                    else
                        return el
                });
            }
            
    
            return(
            
                <div className="movie-tile">
                    <img src={movie.poster} alt="movie poster" width="50"/>
                    <h5>Title: {movie.title}</h5>
                    <h5>Genres:</h5><p> {genresList}</p>
                    <h5>Year:</h5> <p>{movie.year}</p>
        
                    <button className="button" onClick={() => showSingleMovie(movie)}>More</button>
        
                </div>
            );

        }
        
    }
}

export default MovieTile;