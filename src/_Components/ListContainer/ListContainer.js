import React, {Component} from 'react';
import {connect} from 'react-redux'
import Category from './../Category/Category'

import * as UserSessionActions from './../../Actions/userSession'
import {RaisedButton, Dialog, TextField, Paper} from 'material-ui';

class ListContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newCategoryDialogOpen: false,
            newCategoryName: ""
        }
    }

    openDialog = () => {
        this.setState({newCategoryDialogOpen: true})
    }

    closeDialog = () => {
        this.setState({newCategoryDialogOpen: false})
    }

    getUserList = () => {
        this
            .props
            .getUserList("testUser")
    }

    getUserCategories = () => {
        let categories = this.props.userSession.userList._CATEGORIES
        // console.log(categories)
        if (categories === undefined || categories === null) {
            return <h3>You have no categories, Create one!</h3>
        }

        let categoryKeys = Object.keys(categories)
        return categoryKeys.map(x => <Category categoryID={x} key={this.props.userSession.userID + x}/>)
    }

    setNewCategoryName = (newName) => {
        this.setState({newCategoryName: newName.target.value})
        // console.log(this.state.newCategoryName)
    }

    resetNewCategoryName = () => {
        this.setState({newCategoryName: ""})
    }

    createNewCategory = () => {
        this
            .props
            .createNewCategory(this.state.newCategoryName)
        this.resetNewCategoryName()
        this.closeDialog()
    }

    listContainerStyle = {
        // border: "1px solid black",
        maxWidth: "800px",
        margin: "auto",
        padding: "5px 0",
        overflow: "auto"
    }

    render() {
        return (
            <div style={this.listContainerStyle}>

                <Paper
                    style={{
                    padding: "2px 7px",
                    marginTop: "5px",
                    width: "95%",
                    margin: "auto"
                }}
                    zdepth={2}>
                    <p>Copy or bookmark this link to share this list with your friends or access it later</p>
                    <h3>{window.location.href}</h3>
                </Paper>

                <h1>{this.props.userSession.userList.userName}</h1>

                {/* <button onClick={this.createNewCategory}>New Category</button> */}

                <div
                    style={{
                    width: "100%",
                    overflow: "auto"
                }}>
                    <RaisedButton
                        style={{
                        float: "right",
                        marginRight: "10px",
                        marginBottom: "5px"
                    }}
                        label={"New Category"}
                        primary
                        onClick={this.openDialog}/>
                </div>

                <Dialog
                    title="Create a new Category"
                    open={this.state.newCategoryDialogOpen}
                    onRequestClose={this.closeDialog}>
                    <TextField
                        floatingLabelText={"Category Name"}
                        onChange={this.setNewCategoryName}
                        value={this.state.newCategoryName}/>

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

                {this.getUserCategories()}

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        getUserList: userID => dispatch(UserSessionActions.getUserList(userID)),
        createNewCategory: categoryName => dispatch(UserSessionActions.createNewCategory(categoryName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)