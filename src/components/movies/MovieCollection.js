import React from 'react';
import MovieTile from './MovieTile';
import SingleMovie from './SingleMovie';

import './movies.css';
import * as movieList from '../../movies.json';


const MovieCollection = (props) => {

    let content = null;
    let search = props.history.location.search;
    if(search !== null && search !== "") {
        const res = search.slice(search.indexOf("=")+1);
        const movie = movieList.movies.find((el) => el.id === res);
        content = <SingleMovie movie={movie} />
    }
    else {
    content = (
            <div className="movie-list">
                {movieList.movies.map((element, index) => {
                    return <MovieTile key={element.id} movie={element} />
                })}
            </div>
        );
    }


    return(
        <React.Fragment>

            <h3>Movie Collection!</h3>
            <div className="movies-container">
                {content}
            </div>
        </React.Fragment>
    );
}

export default MovieCollection;