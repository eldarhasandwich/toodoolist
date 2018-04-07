import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as UserSessionActions from './../../Actions/userSession'
import {RaisedButton, Dialog, TextField} from 'material-ui';

class RenameCatDialog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newCatName: ""
        }
    }

    setNewCatName = (newName) => {
        this.setState({newCatName: newName.target.value})
    }

    updateCatName = () => {
        this
            .props
            .updateCategoryName(this.props.categoryID, this.state.newCatName)
        this
            .props
            .onRequestClose()
    }

    render() {
        return (
            <Dialog
                title={`Rename '${this
                .props
                .getCategoryName()}'`}
                open={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}>
                <TextField
                    floatingLabelText={"New Name"}
                    onChange={this.setNewCatName}
                    value={this.state.newCatName}
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
                        onClick={this.updateCatName}
                        label={"Change Name"}/>
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
        updateCategoryName: (categoryID, itemName) => dispatch(UserSessionActions.updateCategoryName(categoryID, itemName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenameCatDialog)