import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as UserSessionActions from './../../Actions/userSession'
import {RaisedButton, Dialog, TextField } from 'material-ui';

class EditListNameDialog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newListName: ""
        }
    }

    setNewListName = (newName) => {
        this.setState({newListName: newName.target.value})
    }

    updateListName = () => {
        this.props.updateListName(this.state.newListName)
        this.props.onRequestClose()
    }

    render() {
        return (
                <Dialog
                    title={`Rename '${this.props.userSession.userList.userName}'`}
                    open={this.props.isOpen}
                    onRequestClose={this.props.onRequestClose}
                >
                    <TextField
                        floatingLabelText={"New Name"}
                        value={this.state.newListName}
                        onChange={this.setNewListName}
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
                            onClick={this.updateListName}
                            label={"Change Name"}/>
                    </div>
                </Dialog>
        )
    }
}

const mapStateToProps = state => {
    return {userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        // getUserList: userID => dispatch(UserSessionActions.getUserList(userID)),
        // createNewCategory: categoryName => dispatch(UserSessionActions.createNewCategory(categoryName)),
        updateListName: newName => dispatch(UserSessionActions.updateUserName(newName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditListNameDialog)