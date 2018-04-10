import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as UserSessionActions from './../../Actions/userSession'
import {RaisedButton, Dialog, TextField} from 'material-ui';

class RenameCatDialog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newCatName: "",
            emptyNameErrorMsg: false
        }
    }

    canDeleteCategory = () => {
        let items = this.props.userSession.userList._CATEGORIES[this.props.categoryID]._ITEMS
        if (items === undefined || items === null) {
            return true
        }

        let incompleteItems = Object
            .keys(items)
            .filter(x => !items[x].isComplete)
            .length

        if (incompleteItems > 0) {
            return false
        }

        return true
    }

    setNewCatName = (newName) => {
        this.setState({newCatName: newName.target.value})
    }

    deleteCategory = () => {
        this.props.deleteCategory(this.props.categoryID)
    }

    updateCatName = () => {
        if (this.state.newCatName === "") {
            this.setState({emptyNameErrorMsg: true})
            return
        }

        this.setState(
            {
                newCatName: "",
                emptyNameErrorMsg: false
            }
        )

        this
            .props
            .updateCategoryName(this.props.categoryID, this.state.newCatName)
        this
            .props
            .onRequestClose()
    }

    render() {

        const dialogActions = [
            <RaisedButton
                disabled={!this.canDeleteCategory()}
                secondary
                onClick={this.deleteCategory}
                label={"Delete"}
                style = {{marginLeft: "5px", marginTop: "5px"}}/>,
            <RaisedButton
                primary
                onClick={this.updateCatName}
                label={"Change Name"}
                style = {{marginLeft: "5px", marginTop: "5px"}}/>
        ]

        return (
            <Dialog
                title={`Rename or Delete '${this
                .props
                .getCategoryName()}'`}
                open={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
                actions={dialogActions}>
                <TextField
                    floatingLabelText={"New Name"}
                    onChange={this.setNewCatName}
                    value={this.state.newCatName}
                    errorText={(this.state.emptyNameErrorMsg) ? "Name can't be empty" : null}
                    fullWidth
                    multiLine/>
                <p>The Category must be empty or all Items must be complete to be able to delete it.</p>
            </Dialog>
        );
    }
}

const mapStateToProps = state => {
    return {userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        updateCategoryName: (categoryID, itemName) => dispatch(UserSessionActions.updateCategoryName(categoryID, itemName)),
        deleteCategory: (catID) => dispatch(UserSessionActions.deleteCategory(catID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenameCatDialog)