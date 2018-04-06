import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as UserSessionActions from './../../Actions/userSession'

import { Paper } from 'material-ui'

class Item extends Component {

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
        // console.log("itemClicked")

        this.props.updateItemIsComplete(
            this.props.categoryID,
            this.props.itemID,
            !this.props.userSession.userList._CATEGORIES[this.props.categoryID]._ITEMS[this.props.itemID].isComplete
        )
    }

    render() {
        return (
            <Paper style={this.itemStyle} zDepth={2}>
                <div onClick={this.handleClick}>
                    <p style={this.getTextStyle()}>
                        {this.getItemName()}
                    </p>


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