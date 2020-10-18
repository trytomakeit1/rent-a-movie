import React, {useState, Component} from 'react';
import Authentication from './Authentication';

class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            homeContent: <p>You can use the menu to navigate through the pages
            and rent movies of your choice.</p>
        }
    }

    updateLoginstatus(newStatus) {
        this.props.checkLogin(newStatus);
    }

    render(){

        let homeContent = null;
        if(this.props.authenticated) {
            homeContent = <p>You can use the menu to navigate through the pages
            and rent movies of your choice.</p>;
        }
        else {
            homeContent = <Authentication checkLogin={status => this.updateLoginstatus(status)} />;

        }
        return(
            <div className="main-content">
                {homeContent}
            </div>
        );
    }
}


export default Content;
