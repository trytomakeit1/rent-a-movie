import React, { useState, useEffect, useRef } from 'react';

import {insertMovie} from '../callServer'

const NewMovie = (props) => {

    const refGenresInput = useRef(null);
    const refPosterFileName = useRef(null);

    const [newMovieState, updateNewMovie] = useState({
        notification: {
            message: '',
            color: ''
        },
        errorMessage : ''
    });

    const [yearsState, updateYears] = useState({
        yearOptions: null,

    });

    const [genresState, updateGenres] = useState({
        genresList : []
    });

    const [imagesState, updateImages]= useState({
        imagesList: []
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

        updateYears({
            yearOptions: options
        });

    }, []);


    const addMovieHandler = (e) => {

        e.preventDefault();
        let event = e.target.elements;

        let [isValid, fields] = validityCheck(event);
        isValid = true;
        if(!isValid) {
            let newFields = fields.slice(0, fields.lastIndexOf(","));
            updateNewMovie({
                notification: newMovieState.notification,
                errorMessage: newFields
            })
            
        } else {
            let imagesList = [];
            let formData  = new FormData();
    
            formData.append("title", event.title.value);
            formData.append("year", event.year.value);
            formData.append("country", event.country.value);
            formData.append("imdb_rating", event.imdb_rating.value);
    
            formData.append("genres", genresState.genresList);
            if(event.poster.files.length > 0){
                formData.append("poster", event.poster.files[0]);
                formData.append("poster_name", event.poster.files[0].name);
            }
            for(let i = 0 ; i < event.images.files.length; i++){
                console.log(event.images.files[i]);
    
                imagesList.push(event.images.files[i]);
                formData.append("images", event.images.files[i]);
                formData.append("images_name", event.images.files[i].name);
            }
    
    
            insertMovie(formData, (err, res) => {
    
                if(err) updateNewMovie({
                    notification: {
                        message: "A problem occured",
                        color: "red"},
                    errorMessage: ""
                });
                else {
                    updateNewMovie({
                        notification: {
                            message: "The movie was added successfully",
                            color: "green"},
                        errorMessage: ""
                    });
                }
            });
    

        }
    }


    const addGenresHandler = (e) =>{
        e.preventDefault();
        let genresListCopy = genresState.genresList.slice();
        const genreValue = refGenresInput.current.value;

        if (genreValue.trim().length > 0) {
            let genreExists = false;

            for(let i = 0; i < genresListCopy.length; i++){
                if(genresListCopy[i].toLowerCase() === genreValue.toLowerCase())
                    genreExists = true;

            }
            if( !genreExists) {
                genresListCopy.push(genreValue);
                refGenresInput.current.value = "";
                updateGenres({
                    genresList: genresListCopy
                });
            }

        }
        // can potentially give notification that genre has already been inserted.

    }


    const clearGenresList = (e) => {
        e.preventDefault();
        updateGenres({
            genresList : []
        });
    }


    const posterUploadHandler = (e) => {
        e.preventDefault();
        if(e.target.files.length > 0) {
            refPosterFileName.current.innerHTML = e.target.files[0].name;
        }
    }

    const imagesUploadHandler = (e) => {
        e.preventDefault();
        let files = e.target.files;
        let filenamesList = [];
        if(files.length > 0 ){
            for (let i = 0; i < files.length; i++) {

                filenamesList.push(files[i].name);
            }
            updateImages({
                imagesList: filenamesList
            })
        }
    }



    const validityCheck = (inputValue) => {
        let isValid = true;
        let fields = "";

        if(inputValue.title.value.trim() === '') {
            isValid = false;
            fields += "Title,";
        }
        if(isNaN(inputValue.year.value)) {
            isValid = false;
            fields += "Year,";
        }
        if(inputValue.country.value.trim() === '') {
            isValid = false;
            fields += "Country,";
        }
        if(genresState.genresList.length <= 0) {
            isValid = false;
            fields += "Genres,";
        }
        
        if(inputValue.poster.files.length <= 0) {
            isValid = false;
            fields += "Poster,";
        }
        if(inputValue.images.files.length <= 0) {
            isValid = false;
            fields += "Images,";
        }

        return [isValid, fields];
       

    }



    const imagesListDisplay = imagesState.imagesList.map((imageName, ind) => {
        return <li key={imageName}><label>{imageName}</label></li>
    });

    const genresListDisplay = genresState.genresList.map((genre, ind) => {
        return <li key={genre}><label>{genre}</label></li>
    });

    return(
        
        <div>
            {newMovieState.errorMessage}
            {newMovieState.notification.message !== "" ? 
            <h2 style={{color: newMovieState.notification.color}}>{newMovieState.notification.message}</h2> : null}
            {newMovieState.errorMessage !== "" ?
            <div><h4 style={{color: "red"}}>The following fields are required:</h4><h4 style={{color: 'red'}}>{newMovieState.errorMessage}</h4></div> : null}

            <h2>Please enter the movie's details:</h2>
            <form className="form-control textLeft" onSubmit={addMovieHandler} >
                <div>
                    <label htmlFor="title">Title: </label><input 
                    id="title" type="text" name="title"></input>
                </div>
                <div>
                    <label htmlFor="year">Year: </label>
                    <select id="year" name="year">
                        <option value="select year">Select year</option>
                        {yearsState.yearOptions}

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
                        <input id="genres" type="text" name="genres"
                        ref={refGenresInput}></input>
                        <button style={{marginLeft: "3px"}} onClick={addGenresHandler}>Add genres</button>
                    </div>

                    {genresState.genresList.length > 0 ? 
                    <div style={{margin: "20px 0px"}}>
                        <ul style={{paddingLeft: "12px", margin: "0"}}>
                            {genresListDisplay}
                        </ul>
                        <button style={{marginTop: "3px"}} onClick={clearGenresList}>Clear genres list</button>
                    </div>
                    :null}
                    
                </div>


                <div>
                    <div style={{display: "inline-block"}}>
                        <label htmlFor="poster">Poster: </label>
                        <div style={{display: "inline", marginLeft: "3px", verticalAlign: "super"}} className="fileUploadContainer">
                                <label className="button">Browse</label>
                                <input id="poster" type="file" name="poster" onChange={posterUploadHandler} />
                        </div>
                        
                    </div>
                    <div style={{margin: "20px 0px"}}>
                        <label ref={refPosterFileName}></label>
                    </div>
                </div>

                <div>
                    <div style={{display: "inline-block"}}>
                        <label htmlFor="images">Images: </label>
                        <div style={{display: "inline", marginLeft: "3px", verticalAlign: "super"}} className="fileUploadContainer">
                            <label className="button">Browse</label>
                            <input id="images" type="file" name="image" multiple={true} onChange={imagesUploadHandler}></input>
                        </div>
                    </div>
                    {imagesState.imagesList.length > 0 ?
                    <div style={{margin: "20px 0px"}}>
                        <ul style={{paddingLeft: "12px", margin: "0"}}>
                            {imagesListDisplay}
                        </ul>
                    </div>
                    : null
                    }

                </div>

                <button>Add</button>
            </form>
            
        </div>
    )
}

export default NewMovie;