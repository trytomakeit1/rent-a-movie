import React, { Component } from 'react';
import MovieTile from './MovieTile';
import SingleMovie from './SingleMovie';

import './movies.css';
import {fetchMovies} from '../callServer';

class MovieCollection extends Component {


    state = {
        movies: [],
        error: ''
    }

    componentDidMount() {

        fetchMovies((err, res) => {
            if(err){
                this.setState({error:err});
            } else {
                this.setState({movies: res.result})
            }
        });
    }




    render(){

        let content = null;
        let search = this.props.history.location.search;
        if(search !== null && search !== "") {
            const res = search.slice(search.indexOf("=")+1);
            const movie = this.state.movies.find((el) => el._id == res);
            content = <SingleMovie movie={movie} />
        }
        else {
        content = (
                <div className="movie-list">
                    {this.state.movies.map((element, index) => {
                        return <MovieTile key={element._id} movie={element} />
                    })}
                </div>
            );
        }


        return(
            <React.Fragment>

                <h3>Movie Collection!</h3>
                {this.state.error ?<h4 style={{color:"red"}}>Error: {this.state.error}</h4>:null}
                <div className="movies-container">
                    {content}
                </div>
            </React.Fragment>
        );


    }

}

export default MovieCollection;