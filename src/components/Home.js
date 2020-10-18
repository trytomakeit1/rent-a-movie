import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import Navigation from './Navigation';
import Content from './Content';
import MovieCollection from './MovieCollection';
import RentMovie from './RentMovie';
import About from './About';

class Home extends Component {


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

                        return <Content authenticated={this.state.isLoggedin}
                            checkLogin={(newIsLoggedin) => this.checkLogin(newIsLoggedin)} />
                    }} />
                </Switch>

 
                {this.state.isLoggedin ? 
                    <Switch>
                        <Route path="/movies" component={MovieCollection} />
                        <Route path="/rent-a-movie" component={RentMovie} />
                    </Switch>
                    : null}

            </div>
        );
    }
}

export default withRouter(Home);