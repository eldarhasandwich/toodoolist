import React, {Component} from 'react';
import {connect} from 'react-redux'
// import Category from './../Category/Category'

// import EditListNameDialog from './EditListNameDialog'

import * as UserSessionActions from './../../Actions/userSession'
import {RaisedButton, Dialog, TextField } from 'material-ui';

class CreateNewCatDialog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newCategoryName: ""
        }
    }

    setNewCategoryName = (newName) => {
        this.setState({newCategoryName: newName.target.value})
    }

    resetNewCategoryName = () => {
        this.setState({newCategoryName: ""})
    }

    createNewCategory = () => {
        this
            .props
            .createNewCategory(this.state.newCategoryName)
        this.resetNewCategoryName()
        this.props.onRequestClose()
    }

    render() {
        return (

                <Dialog
                    title="Create a new Category"
                    open={this.props.isOpen}
                    onRequestClose={this.props.onRequestClose}>
                    <TextField
                        floatingLabelText={"Category Name"}
                        onChange={this.setNewCategoryName}
                        value={this.state.newCategoryName}
                        fullWidth
                        multiLine    
                    />

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
                            onClick={this.createNewCategory}
                            label={"Create Category"}/>
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
        // getUserList: userID => dispatch(UserSessionActions.getUserList(userID)),
        createNewCategory: categoryName => dispatch(UserSessionActions.createNewCategory(categoryName)),
        // updateListName: newName => dispatch(UserSessionActions.updateUserName(newName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewCatDialog)