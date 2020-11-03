import React, {useEffect, useState} from 'react';
import {rentedMovies} from '../callServer';

const RentedMovies = () => {


    const [ currentState, updateState] = useState({
        rentedmoviesList: []
    });

    useEffect(()=>{
        console.log("component did mount useEffect");
        rentedMovies(localStorage.getItem('user'),
        (err, res) => {
            if(err) console.log(err)
            else{
                console.log(res);
                updateState({
                    rentedmoviesList: res
                })
            }
        });
    }, []);



    return(
        <div>
        <h3>Rented Movies</h3>

        <div>
            {currentState.rentedmoviesList ? 
            currentState.rentedmoviesList.map((el, ind) => { 
                return( 
                <div className="movie-tile" key={el.movie._id}>
                    <img src={el.movie.poster} alt="movie poster" width="50"/>
                    <h5>Title: {el.movie.title}</h5>
                    <h5>Year:</h5> <p>{el.movie.year}</p>
                    <h5>Due date:</h5> <p>{el.rentDate}</p>
        
                </div>
                )
            }) : null}
        </div>
        </div>
    );
}

export default RentedMovies;