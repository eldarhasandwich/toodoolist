import React, {Component} from 'react';
// import logo from '../logo.svg';
import './App.css';
import {connect} from 'react-redux'
import ListContainer from './ListContainer/ListContainer'
import NewListPage from './NewListPage/NewListPage'

import { Paper } from 'material-ui'
 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

    headerStyle = {
        backgroundColor: "rgb(102, 0, 97)",
        padding: "20px",
        color: "white"
    }

    render() {
        return (
            <div className="App">
                <MuiThemeProvider>
                    <div>
                        <div style={this.headerStyle}>
                            <h1 className="App-title">TooDooList - alpha 3</h1>
                        </div>

                    {
                        (this.props.userSession.userID !== null) 
                            ? <ListContainer/>
                            : <NewListPage/>
                    }

                    </div>
                </MuiThemeProvider>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(App)