import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import Navigation from './Navigation';
import Home from './Home';
import MovieCollection from './movies/MovieCollection';
import RentedMovies from './movies/RentedMovies';
import About from './About';
import Dashboard from './admin/Dashboard';

class Content extends Component {


    state = {
        isLoggedin: false,
        isAdmin: false
    }

    componentDidMount() {

        const currentToken = localStorage.getItem('token');
        const isAdmin = localStorage.getItem('user') === 'admin' ?
        true: false ;
        if( currentToken !== null && currentToken !== '') {
            this.setState ({
                isLoggedin: true,
                isAdmin: isAdmin
            });
        }
    }


    checkLogin(newIsLoggedin){

        let isAdmin = false;
        if(newIsLoggedin === true && 
            localStorage.getItem('user') === 'admin') {
                isAdmin = true;
            }
        this.setState({
            isLoggedin: newIsLoggedin,
            isAdmin: isAdmin
        });
    }

    render(){

        return (
            <div>
                <Navigation authenticated={this.state}
                    checkLogin={(newIsLoggedin) => this.checkLogin(newIsLoggedin)} />
                    
                <div className="container">
                
                    <Switch>
                        <Route path="/about" component={About} />
                        <Route path="/" exact render={()=>{

                            return <Home authenticated={this.state.isLoggedin}
                                checkLogin={(newIsLoggedin) => this.checkLogin(newIsLoggedin)} />
                        }} />
                    </Switch>

    
                    {this.state.isLoggedin ? 
                        <Switch>
                            <Route path="/movies" render={()=> <MovieCollection {...this.props}/>} />
                            <Route path="/rented-movies" component={RentedMovies} />
                            {(this.state.isLoggedin && this.state.isAdmin) ?
                                <Route path="/dashboard" component={Dashboard} />
                                : null
                            }
                        </Switch>
                        : null}

                </div>

            </div>
        );
    }
}

export default withRouter(Content);