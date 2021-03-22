import React, { Component } from 'react';
import axios from "axios";

class Users extends Component {
    constructor(){
        super();
        this.state = {
            Users: 'not yet gotten'
        };
    }

    /*handleRetrieveUserButtonClick = () => {
        console.log("called");
        axios.get("/users").then(response => {
            console.log(response.data);
            this.setState({
                Users: JSON.stringify(response.data)
            });
        })
    }
    */


    render() {
        return (
            <div>
            </div>
        );
    }
}

export default Users;