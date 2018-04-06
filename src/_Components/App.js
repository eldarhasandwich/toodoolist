import React, {Component} from 'react';
// import logo from '../logo.svg';
import './App.css';
import {connect} from 'react-redux'
import ListContainer from './ListContainer/ListContainer'

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
                        <Paper style={this.headerStyle}>
                            {/* <img src={logo} className="App-logo" alt="logo"/> */}
                            <h1 className="App-title">TooDooList - alpha</h1>
                        </Paper>

                        <ListContainer/>
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