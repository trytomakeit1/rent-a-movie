import React from 'react';
import {rentMovie} from '../callServer';

const SingleMovie = (props) => {

    const movie = props.movie;

    if(!movie)
        // this condition is necessary cause I show null, until I receive the data from api
        return null
    else {

        // Genres list
        let genresList = [];
        if(movie.genres) {
            genresList = movie.genres.map((el, ind)=> {
                if (ind < movie.genres.length - 1)
                    return el + ", "
                else
                    return el
            });
        }

        // Details
        let singleMovieDetails = null;
        let keysList = ["title", "year", "country", "imdb_rating"];
        singleMovieDetails = keysList.map((el, ind) => {

            if(movie[el]) {
            return (<div className="movie-detail-item" key={ind}>
            <span style={{fontWeight: 700}}>{el}: </span><span>{movie[el]}</span>
        </div>);
            }
        });

        //images
        let imagesList = null;
        if(movie.images){
            imagesList = movie.images.map((el, ind)=> {
                return <img src={el} alt={el} key={ind} />
            });
        }



        const rent = () => {
            //check all before sending
            // userid
            const username = localStorage.getItem('user');
            if(username && username !== '') {

                const movieId = movie._id;
                rentMovie({username: username, movieId: movieId},(err, res) => {
                    if(err)
                    console.log('the result of rentMovie had error', err)
                    else
                    console.log("res of rentMovie success", res)
                    
                });

            } else {

            }
            
        }


        return(
            <div className="movie-details">

            <h4>Detail of the movie</h4>
            <div className="movie-details-images">
                {imagesList}
            </div>
            {singleMovieDetails}
            <div className="movie-detail-item">
                <span style={{fontWeight: 700}}>Genres: </span><span> {genresList}</span>
            </div>
            <div className="">
                <button className="button float-right" onClick={rent}>Rent</button>
                <div style={{clear: "both"}}></div>
            </div>
            
            </div>
        );
    }
}

export default SingleMovie;