import React from 'react';
import {NavLink, Link} from 'react-router-dom';


const Navigation = (props) => {

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        props.checkLogin(false);
    }

    return(
        <header className="main-header">
            <div className="main-header-left">
                <img src="/logo-rent-a-movie-100.png" 
                width="50" alt="logo"></img>
                <h4>Rent a Movie</h4>
            </div>
            <div className="main-header-right">
                <nav>
                    <NavLink to="/" exact>Home</NavLink>
                    {props.authenticated ?
                        <React.Fragment>
                            <NavLink to="/movies">Movies</NavLink>
                            <NavLink to="/rented-movies">Rent a movie</NavLink>        
                        </React.Fragment>
                        :
                        null
                    }
                    <NavLink to="/about">About</NavLink>

                    {/* NavLink would add a permanent active class. I guess because of onlick. */}
                    {props.authenticated ?
                    <Link to="/" onClick={logout}>Logout</Link> : null }

                </nav>
            </div>
        </header>
    	);
}

export default Navigation;