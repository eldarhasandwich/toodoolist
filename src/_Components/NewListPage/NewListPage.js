import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as UserSessionActions from './../../Actions/userSession'
import { Paper, RaisedButton, CircularProgress } from 'material-ui';


class NewListPage extends Component {

    getUserList = (listKey) => {
        this
            .props
            .getUserList(listKey)
    }

    createNewUser = () => {
        this.props.createNewUser()
    }

    newListPageStyle = {
        maxWidth: "600px",
        marginTop: "5px",
        margin: "5px auto",

    }

    componentWillMount() {
        let urlKey = window.location.pathname.split("/")
        // console.log(urlKey)

        if (urlKey[urlKey.length-1] === "toodoolist") { // this is it get it working on github, find a better way
            urlKey.push("newList")

            window.location.pathname = urlKey.join("/")
            return
        }

        if (urlKey[urlKey.length-1] === "") {
            urlKey[urlKey.length-1] = "newList"

            window.location.pathname = urlKey.join("/")
            return
        }

        this.props.getUserList(urlKey[urlKey.length-1])
    }

    render() {
        if (this.props.userSession.listIsLoading) {
            return (
                <div>
                    <CircularProgress
                        style={{margin:"20px"}}
                        size={120} thickness={7}
                        />

                    <div>
                        Loading!
                    </div>
                </div>
            )
        }
        
        return (
            <div style={this.newListPageStyle}>

                <Paper style={{padding: "10px", width:"95%", margin: "auto"}}>

                    <p>Easily create and share Todo lists with your friends!</p>

                    <RaisedButton
                        primary
                        label={"Create new List"}
                        onClick={this.createNewUser}
                    />

                </Paper>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        getUserList: userID => dispatch(UserSessionActions.getUserList(userID)),
        createNewUser: () => dispatch(UserSessionActions.createNewUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewListPage)