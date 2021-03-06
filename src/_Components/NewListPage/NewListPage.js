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
        let urlString = window.location.href
        let url = new URL(urlString)
        let listKey = url.searchParams.get("k")
        console.log(listKey)
        if (listKey === null) {
            return
        }
        
        this.props.getUserList(listKey)
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

                    {
                        (this.props.userSession.listKeyIncorrentMsg)
                            ? <h3>The key you are trying to use is not correct :(</h3>
                            : null
                    }

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