import React, { useState } from 'react';

import NewMovie from './NewMovie';
import './dashboard.css';

const Dashboard = () => {

    const [showNewMovieState, updateshowNewMovie] = useState({
        showNewMovie : false
    });

    const showMovieHandler = () => {
        updateshowNewMovie({
            showNewMovie: true
        })
    };



    return(
        <div>
            <h2>Welcome to Dashboard</h2>
            {!showNewMovieState.showNewMovie ? 
            <button className="button" onClick={showMovieHandler}>Add new Movie</button>:
            <NewMovie />}
            
        </div>
    )
}

export default Dashboard;