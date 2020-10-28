import React from 'react';
import Authentication from './Authentication';

const Home = (props) => {

    const updateLoginstatus = (newStatus) => {
        props.checkLogin(newStatus);
    }


    let homeContent = null;
    if(props.authenticated) {
        homeContent = <p>You can use the menu to navigate through the pages
        and rent movies of your choice.</p>;
    }
    else {
        homeContent = <Authentication checkLogin={updateLoginstatus} />;

    }
    return(
        <div className="main-content">
            {homeContent}
        </div>
    );
}


export default Home;
