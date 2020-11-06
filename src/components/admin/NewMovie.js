import React, { useState, useEffect } from 'react';

import {insertMovie} from '../callServer'

const Dashboard = (props) => {

    const [newMovieState, updateNewMovie] = useState({
        showNewMovie : false,
        options: null,
        notification: ''
    });

    useEffect(() => {
        const startYear = 1920;
        const finalYear = new Date().getFullYear();
        let years = [];

        for(let i = 0; i <= finalYear-startYear; i++) {
           years[i] = finalYear - i;
        }

        const options = years.map((el, ind) => {
            return <option key={el} value={el}>{el}</option>
        });

        updateNewMovie({
            options: options
        })

    }, []);


    const addMovieHandler = (e) => {

        e.preventDefault();
        let event = e.target.elements;
        let newMovie = {
            title: event.title.value,
            year: event.year.value,
            country: event.country.value,
            imdb_rating: event.imdb_rating.value,
            genres:[event.genres.value]
        }
        console.log(newMovie);

        insertMovie(newMovie, (err, res) => {

            if(err) updateNewMovie({
                notification: 'A problem occured'
            });
            else {
                updateNewMovie({
                    notification: 'The movie was added successfully'
                });
            }
        });
    }


    return(
        <div>
            {newMovieState.notification !== '' ? 
            <h2 style={{color: 'red'}}>{newMovieState.notification}</h2> : null}

            <h2>Please enter the movie's details:</h2>
            <form className="form-control textLeft" onSubmit={addMovieHandler} >
                <div>
                    <label htmlFor="title">Title: </label><input 
                    id="title" type="text" name="title"></input>
                </div>
                <div>
                    <label htmlFor="year">Year: </label>
                    <select id="year" name="year">
                        {newMovieState.options}
                    </select>
                </div>
                <div>
                    <label htmlFor="country">Country: </label><input 
                    id="country" type="text" name="country"></input>
                </div>
                <div>
                    <label htmlFor="imdb_rating">IMDB rating: </label><input 
                    id="imdb_rating" type="text" name="imdb_rating"></input>
                </div>
                <div>
                    <label htmlFor="genres">Genres: </label><input 
                    id="genres" type="text" name="genres"></input>
                </div>


                {/* poster and images upload */}
                {/*genres, poster, images*/}

                <button>Add</button>
            </form>
            
        </div>
    )
}

export default Dashboard;