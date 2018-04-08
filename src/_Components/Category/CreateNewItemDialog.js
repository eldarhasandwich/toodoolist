import React, {Component} from 'react';
import {connect} from 'react-redux'
// import Item from '../Item/Item'

import * as UserSessionActions from './../../Actions/userSession'
import {RaisedButton, Dialog, TextField } from 'material-ui';

class CreateNewItemDialog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newItemName: "",
            emptyNameErrorMsg: false
        }
    }

    createNewItem = () => {
        this
            .props
            .createNewItem(this.props.categoryID, "new item")
    }

    setNewItemName = (newName) => {
        this.setState({newItemName: newName.target.value})
    }

    resetNewItemName = () => {
        this.setState({newItemName: ""})
    }

    createNewItem = () => {
        if (this.state.newItemName === "") {
            this.setState({emptyNameErrorMsg: true})
            return
        }

        this.setState(
            {
                newItemName: "",
                emptyNameErrorMsg: false
            }
        )

        this
            .props
            .createNewItem(this.props.categoryID, this.state.newItemName)
        this.resetNewItemName()

    }

    createNewItemAndClose = () => {
        this.createNewItem()

        if (this.state.newItemName === "") {
            this.setState({emptyNameErrorMsg: true})
            return
        }

        this
            .props
            .onRequestClose()
    }

    render() {

        const actions = [
            <RaisedButton
                secondary
                onClick={this.createNewItem}
                label={"Add Item + Create New"}
                style = {{marginLeft: "5px", marginTop: "5px"}}
            />,

            <RaisedButton
                primary
                onClick={this.createNewItemAndClose}
                label={"Add Item"}
                style = {{marginLeft: "5px", marginTop: "5px"}}
            />
        ]

        return (
            <Dialog
                title={`Create a new Item under '${this
                .props
                .getCategoryName()}'`}
                open={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
                actions={actions}>
                <TextField
                    ref={"itemNameField"}
                    floatingLabelText={"Item"}
                    onChange={this.setNewItemName}
                    value={this.state.newItemName}
                    errorText={(this.state.emptyNameErrorMsg) ? "Name can't be empty" : null}
                    fullWidth
                    multiLine/>
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