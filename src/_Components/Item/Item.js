import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as UserSessionActions from './../../Actions/userSession'

import { Paper, Dialog, RaisedButton } from 'material-ui'

class Item extends Component {

    constructor(props){
        super(props)

        this.state = {
            untickAlertOpen: false
        }
    }

    openAlert = () => {
        this.setState({untickAlertOpen: true})
    }

    closeAlert = () => {
        this.setState({untickAlertOpen: false})
    }

    getItemName = () => {
        return this.props.userSession.userList._CATEGORIES[this.props.categoryID]._ITEMS[this.props.itemID].itemName
    }

    getTextStyle = () => {
        return (this.props.userSession.userList._CATEGORIES[this.props.categoryID]._ITEMS[this.props.itemID].isComplete)
            ? {textDecoration: "line-through"}
            : {}
    }

    itemStyle = {
        width: "95%",
        margin: "5px auto",
        padding: "1px 0"
    }

    handleClick = () => {
        if (this.props.userSession.userList._CATEGORIES[this.props.categoryID]._ITEMS[this.props.itemID].isComplete) {
            this.openAlert()
            return
        }

        this.updateItemIsComplete()
    }
    
    updateItemIsComplete = () => {        
        this.props.updateItemIsComplete(
            this.props.categoryID,
            this.props.itemID,
            !this.props.userSession.userList._CATEGORIES[this.props.categoryID]._ITEMS[this.props.itemID].isComplete
        )
        this.closeAlert()
    }

    render() {

        const alertActions = [
            <RaisedButton
                primary
                label={"Cancel"}
                onClick={this.closeAlert}
            />,
            <RaisedButton
                style={{marginLeft: "5px"}}
                primary
                label={"Confirm"}
                onClick={this.updateItemIsComplete}
            />            
        ]


        return (
            <Paper style={this.itemStyle} zDepth={2}>
                <div onClick={this.handleClick}>
                    <p style={this.getTextStyle()}>
                        {this.getItemName()}
                    </p>

                    <Dialog
                        actions={alertActions}
                        open={this.state.untickAlertOpen}
                        onRequestClose={this.closeAlert}
                    >
                        {`'${this.getItemName()}' is marked as complete, would you like to set it as incomplete?`}
                    </Dialog>
                </div>
            </Paper>
        );
    }
}

const mapStateToProps = state => {
    return {userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        updateItemIsComplete: (catID, itemID, bool) => dispatch(UserSessionActions.updateItemIsComplete(catID, itemID, bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)