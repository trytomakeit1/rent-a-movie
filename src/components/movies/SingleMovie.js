import React from 'react';

const SingleMovie = (props) => {

    const movie = props.movie;

    if(!movie)
        // this condition is necessary cause I show null, until I receive the data from api
        return null
    else {

        // Genres list
        let genresList = [];
        if(movie.genres) {
            genresList = movie.genres.map((el, index)=> {
                if (index < movie.genres.length - 1)
                    return el + ", "
                else
                    return el
            });
        }

        // Details
        let singleMovieDetails = null;
        let keysList = ["title", "year", "country", "imdb_rating"];
        singleMovieDetails = keysList.map((el, index) => {

            if(movie[el]) {
            return (<div className="movie-detail-item" key={index}>
            <span style={{fontWeight: 700}}>{el}: </span><span>{movie[el]}</span>
        </div>);
            }
        });

        //images
        let imagesList = null;
        if(movie.images){
            imagesList = movie.images.map((el, index)=> {
                console.log(el);
                return <img src={el} alt={el} />
            });
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
                <button className="button float-right">Rent</button>
                <div style={{clear: "both"}}></div>
            </div>
            
            </div>
        );
    }
}

export default SingleMovie;