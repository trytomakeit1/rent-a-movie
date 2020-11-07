import React, { useState, useEffect, useRef } from 'react';

import {insertMovie} from '../callServer'

const NewMovie = (props) => {

    const refGenresInput = useRef(null);
    const refGenresList = useRef(null);

    const [newMovieState, updateNewMovie] = useState({
        showNewMovie : false,
        notification: ''
    });
    const [inputState, updateInputState] = useState({
        yearOptions: null,
        addedGenres : '',
        genresList : []
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


        updateInputState((prevState) => {
            return{
            genresList: prevState.genresList,
            yearOptions: options
}        })


    }, []);


    const addMovieHandler = (e) => {

        e.preventDefault();
        let event = e.target.elements;
        let newMovie = {
            title: event.title.value,
            year: event.year.value,
            country: event.country.value,
            imdb_rating: event.imdb_rating.value,
            genres: inputState.genresList

        }
        console.log(newMovie);

        insertMovie(newMovie, (err, res) => {

            if(err) updateNewMovie({

                notification: 'A problem occured',
                showNewMovie: newMovieState.showNewMovie
            });
            else {
                updateNewMovie({
                    notification: 'The movie was added successfully',
                    showNewMovie: newMovieState.showNewMovie


                });
            }
        });
    }


    const addGenresHandler = (e) =>{
        e.preventDefault();
        let genresListCopy = inputState.genresList.slice();
        genresListCopy.push(refGenresInput.current.value);
        let newAddedGenres = inputState.addedGenres ? inputState.addedGenres + "\n" + refGenresInput.current.value
        : refGenresInput.current.value;
        refGenresInput.current.value = "";
        updateInputState({
            genresList: genresListCopy,
            addedGenres: newAddedGenres,
            yearOptions: inputState.yearOptions
        });

    }


    const clearGenresList = (e) => {
        e.preventDefault();
        //refGenresList.current.value = "";
        updateInputState({
            yearOptions: inputState.yearOptions,
            addedGenres : '',
            genresList : []

        })

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
                        {inputState.yearOptions}

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
                <div style={{display: "inline-block"}}>
                    <label htmlFor="genres">Genres: </label>
                    <input size="10"
                    id="genres" type="text" name="genres"
                    ref={refGenresInput}></input>
                    <button style={{marginLeft: "3px"}} onClick={addGenresHandler}>Add genres</button>
                </div>
                <div style={{display: "inline-block"}}>
                    <textarea ref={refGenresList}
                     style={{padding: "0", verticalAlign: "top", marginLeft: "20px", resize: "none"}}
                    cols="20" rows="3" readOnly="readOnly" value={inputState.addedGenres ? inputState.addedGenres : "No Genres"}
                    ></textarea>
                    {inputState.addedGenres ? <button style={{marginLeft: "3px"}} onClick={clearGenresList}>Clear genres list</button> : null}
                    </div>
                </div>
                


                {/* poster and images upload */}
                {/*genres, poster, images*/}

                <button>Add</button>
            </form>
            
        </div>
    )
}

export default NewMovie;