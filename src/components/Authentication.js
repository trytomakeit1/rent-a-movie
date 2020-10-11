import React, {Component} from 'react';

import axios from 'axios';

class Authentication extends Component {

    authenticate(e){
        e.preventDefault();

        axios.post('http://localhost:8080/api/login', {username: e.target.elements.email.value
            , password: e.target.elements.password.value}).then(res => {

                if(res.data.error){
                    console.log("Error from API: ", res.data.error);

                } else {
                    // no result found for this user
                    if(res.data.result.status === 0)
                        console.log("username or password incorrect.");
                    else {
                        localStorage.setItem('token', res.data.result.token);
                    }
                }

            }).catch(err => {
                console.log(err);
            });

    }


    render() {

        return(

            <div>
                <form className="form-control" onSubmit={this.authenticate}>
                        
                    <input type="text" name="email" placeholder="email"></input>
                    <input type="password" name="password" placeholder="password"></input>
                    <button>Submit</button>
                </form>

                
            </div>
        );
    }
}


export default Authentication;