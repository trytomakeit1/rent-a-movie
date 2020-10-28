
import axios from 'axios';


const fetchList = (cb) => {

    const url = 'http://moviesapi.ir/api/v1/movies?page=1';


    axios.get(url).then(res => {
        if(res.status === 200) {
            cb(null, res.data.data);

        }else {
            console.log("error occured in getting movies");
            cb("Error fetching the movies list");
        }

    }).catch(e => {
        console.log("error in getting movies", e);
        cb("Error fetching the movies list");
    })
}

export default fetchList;


