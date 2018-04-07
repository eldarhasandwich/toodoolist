import React, {Component} from 'react';
import {connect} from 'react-redux'
// import Item from '../Item/Item'

import * as UserSessionActions from './../../Actions/userSession'
import {RaisedButton, Dialog, TextField } from 'material-ui';

class CreateNewItemDialog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newItemName: ""
        }
    }

    createNewItem = () => {
        this
            .props
            .createNewItem(this.props.categoryID, "new item")
    }

    setNewItemName = (newName) => {
        this.setState({newItemName: newName.target.value})
        // console.log(this.state.newItemName)
    }

    resetNewItemName = () => {
        this.setState({newItemName: ""})
    }

    createNewItem = () => {
        this
            .props
            .createNewItem(this.props.categoryID, this.state.newItemName)
        this.resetNewItemName()
        this
            .props
            .onRequestClose()
    }

    render() {
        return (

            <Dialog
                title={`Create a new Item under '${this
                .props
                .getCategoryName()}'`}
                open={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}>
                <TextField
                    floatingLabelText={"Item"}
                    onChange={this.setNewItemName}
                    value={this.state.newItemName}
                    fullWidth
                    multiLine/>

                <div
                    style={{
                    width: "100%",
                    overflow: "auto"
                }}>
                    <RaisedButton
                        style={{
                        float: "right"
                    }}
                        primary
                        onClick={this.createNewItem}
                        label={"Create Item"}/>
                </div>
            </Dialog>

        );
    }
}

const mapStateToProps = state => {
    return {userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        createNewItem: (categoryID, itemName) => dispatch(UserSessionActions.createNewItem(categoryID, itemName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewItemDialog)