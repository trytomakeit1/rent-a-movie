import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import Navigation from './Navigation';
import Home from './Home';
import MovieCollection from './movies/MovieCollection';
import RentMovie from './RentMovie';
import About from './About';

class Content extends Component {


    constructor(props){
        super(props);
        this.state = {
            isLoggedin: false
        }
    }

    componentDidMount() {

        const currentToken = localStorage.getItem('token');

        if( currentToken !== null && currentToken !== '') {
            console.log("cmp mounted - token not empty/null and is:", currentToken);
            this.setState ({
                isLoggedin: true
            });
        }
    }


    checkLogin(newIsLoggedin){

        this.setState({
            isLoggedin: newIsLoggedin
        });
    }

    render(){

        return (
            <div>
                <Navigation authenticated={this.state.isLoggedin} 
                    checkLogin={(newIsLoggedin) => this.checkLogin(newIsLoggedin)} />
                <h2>Main page</h2>
               
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
                        <Route path="/rent-a-movie" component={RentMovie} />
                    </Switch>
                    : null}

            </div>
        );
    }
}

export default withRouter(Content);