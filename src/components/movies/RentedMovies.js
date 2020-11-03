import React, {useEffect, useState} from 'react';
import {rentedMovies} from '../callServer';

const RentedMovies = () => {


    const [ currentState, updateState] = useState({
        moviesList: []
    })
    useEffect(()=>{
        console.log("component did mount useEffect");
        rentedMovies(localStorage.getItem('user'), (err, res) => {
            if(err) console.log(err)
            else{
                console.log(res.result);
                updateState({
                    moviesList: res.result.rentedMovies
                })
               
            }
        });
    }, []);



    return(
        <div>
        <h3>Rented Movies</h3>

        {currentState.moviesList ? currentState.moviesList.map((el, ind) => { 
            return console.log(el);
        }) : null}

            <div className="movie-detail-item">
                <span style={{fontWeight: 700}}>Movie Id: </span><span> xxx</span>
            </div>

            <div className="movie-detail-item">
                <span style={{fontWeight: 700}}>Rent date: </span><span> yyy</span>
            </div>

        {/* 
            {singleMovieDetails} */}
           {/*  <div className="movie-detail-item">
                <span style={{fontWeight: 700}}>Genres: </span><span> {genresList}</span>
            </div> */}
           {/*  <div className="">
                <button className="button float-right" onClick={rent}>Rent</button>
                <div style={{clear: "both"}}></div>
            </div> */}
        </div>
    );
}

export default RentedMovies;