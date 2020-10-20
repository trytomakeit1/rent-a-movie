import React, {useState} from 'react';
import axios from 'axios';


const Authentication = (props) => {

    const [currentState, updateState] = useState({
        signup: true,
        isLoggedin: false,
        email: '',
        error: ''
    });   
    
    const toggleSignin = () => {
        //clear all fields
        document.getElementsByName("email")[0].value = "";
        if(document.getElementsByName("name")[0])
            document.getElementsByName("name")[0].value = "";
        document.getElementsByName("password")[0].value = "";

        updateState({
            signup: !currentState.signup,
            isLoggedin: currentState.isLoggedin,
            email: currentState.email,
            error: ''
        })
    }


    const signup = (e) => {

        e.preventDefault();
        let name = e.target.elements.name.value;
        let email = e.target.elements.email.value;
        let password = e.target.elements.password.value;

        if(name === null || email === null || password === null) {

            updateState({signup: currentState.signup,
                isLoggedin: false,
                email: currentState.email,
                error: 'Please fill all the fields.'});

        } else {

            axios.post('http://localhost:8080/api/signup', {name: name, email: email
            , password: password}).then(res => {
                console.log("signup apiresponse:", res);
                let result = res.data;
                if(result.error){
                    console.log("Error from API: ", result.error);
                    updateState({
                        signup: currentState.signup,
                        isLoggedin: false,
                        email: '',
                        error: result.error

                    });


                } else {
                        localStorage.setItem('token', result.result.token);
                        updateState({
                            signup: currentState.signup,
                            isLoggedin: true,
                            email: email,
                            error: currentState.error

                        });

                        props.checkLogin(true);
                }

            }).catch(err => {
                console.log("Error axios - API - signup ", err);
                updateState({
                    signup: currentState.signup,
                    isLoggedin: false,
                    email: '',
                    error: "There was a problem with processing your request. Try again later."

                });
            });
        }


    }




    const signin = (e) => {

        e.preventDefault();
        let email = e.target.elements.email.value;
        let password = e.target.elements.password.value;

        if(email === null || password === null) {

            updateState({signup: currentState.signup,
                isLoggedin: false,
                email: currentState.email,
                error: 'Please fill all the fields.'});
        
        } else {

            axios.post('http://localhost:8080/api/login', {email: email
                , password: password}).then(res => {
                    let result = res.data;
                    if(result.error){
                        console.log("Error from API: ", result.error);
                        updateState({
                            signup: currentState.signup,
                            isLoggedin: false,
                            email: '',
                            error: result.error
            
                        });

                    } else {
                        // no result found for this user
                        if(result.result.status === 0)
                            console.log("username or password incorrect.");
                        else {
                            localStorage.setItem('token', result.result.token);

                            updateState({
                                signup: currentState.signup,
                                isLoggedin: true,
                                email: email,
                                error: currentState.error

                            });
                            
                            props.checkLogin(true);
                        }
                    }

                }).catch(err => {
                    
                    console.log("Error axios - API - signin ", err);
                    updateState({
                        signup: currentState.signup,
                        isLoggedin: false,
                        email: '',
                        error: "There was a problem with processing your request. Try again later."
            
                    });

                });


        }

    }


    let signingform = null;
    if(currentState.signup === false) {
        //Login
        signingform =
        (<div className="signin-form">
            <form className="form-control" onSubmit={signin}>

                <input type="text" name="email" placeholder="email"></input>
                <input type="password" name="password" placeholder="password"></input>
                <button>Sign in</button>
            </form>
            <p>Click to <button className="link-button" onClick={toggleSignin}>SIGN UP</button></p>
        </div>);
    }else {
        //Sign up
        signingform = 
        (<div className="signup-form">
            <form className="form-control" onSubmit={signup}>

                <input type="text" name="name" placeholder="Name"></input>
                <input type="text" name="email" placeholder="Email"></input>
                <input type="password" name="password" placeholder="Password"></input>
                <button>Sign up</button>
            </form>
            <p>Click to <button className="link-button" onClick={toggleSignin}>SIGN IN</button></p>
        </div>);
    }


    return(

        <div>
            {currentState.error ?<h4 style={{color:"red"}}>Error: {currentState.error}</h4>:null}

            {signingform}
        </div>
    );
    
}


export default Authentication;