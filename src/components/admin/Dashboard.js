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

            {!showNewMovieState.showNewMovie ?
            <div>
                <h2>Welcome to Dashboard</h2> 
                <button className="button" onClick={showMovieHandler}>Add new Movie</button>
            </div>
            : <NewMovie />}
            
        </div>
    )
}

export default Dashboard;