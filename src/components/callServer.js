import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/';

const verifyToken = (token,cb) => {

    axios.post(baseUrl + 'verifyToken', { token: token})
    .then(res => {
        let result = res.data
        console.log(result);
        if(result.error) {
            cb("There was a problem: " + result.error);

        } else {
            cb(null, result);

        }
    })
    .catch(e => {

        console.log("Error-axio-verifyToken", e);
        cb("Error - axios verifyToken");
        // show error
    })
}

const rentMovie = (params, cb) => {
    // check params
    axios.post(baseUrl + '/rentMovie', params)
    .then((res) => {

        let result = res.data
        console.log("result promise axios rentMovie: ", result);
        if(result.error) {
            cb("There was a problem: " + result.error);

        } else {
            cb(null, result);

        }
    })
    .catch(
        e => {console.log("Error-axio-rentMovie", e);
        cb("Error - axios rentMovie");}
    );
}



const rentedMovies = (username, cb) => {
    // check params

    axios.get(baseUrl + 'rentedMovies/' + username).then(res => {
        let result = res.data
        if(result.error) {
            cb("There was a problem: " + result.error);
        }else {
            cb(null, result.result);
        }


    })
    .catch(e => {console.log("Error-axio-rentedMovies", e);
        cb("Error - axios rentedMovies");

    });
}


const fetchMovies = (cb) => {

    const url = baseUrl + 'movies';


    axios.get(url).then(res => {
        if(res.status === 200) {
            cb(null, res.data);

        }else {
            console.log("error occured in getting movies");
            cb("Error fetching the movies list");
        }

    }).catch(e => {
        console.log("error in getting movies", e);
        cb("Error fetching the movies list");
    })
}



const insertMovie = (movie, cb) => {
    //check params
    axios.post(baseUrl + 'addMovie', movie)
    .then(res => {
        const result = res.data;
        if(res.status === 200) {

            
            if(result.error) {
                cb("There was a problem: " + result.error);
            }else {
                cb(null, result.result);
            }

        } else {
            console.log("error in adding movies", result.error);
            cb("Error adding the new movie");
        }

    }).catch(e => {
        console.log("error in adding movies", e);
        cb("Error adding the new movie");

    });

}



export {verifyToken, rentMovie, rentedMovies, fetchMovies, insertMovie};