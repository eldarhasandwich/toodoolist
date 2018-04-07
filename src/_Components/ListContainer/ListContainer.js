import React, {Component} from 'react';
import {connect} from 'react-redux'
import Category from './../Category/Category'

import EditListNameDialog from './EditListNameDialog'
import CreateNewCatDialog from './CreateNewCatDialog'

import './../../Styles/glitch.css'

import * as UserSessionActions from './../../Actions/userSession'
import {RaisedButton, Paper} from 'material-ui';

class ListContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newCategoryDialogOpen: false,
            editListNameDialogOpen: false,
        }
    }

    openNewCategoryDialog = () => {
        this.setState({newCategoryDialogOpen: true})
    }

    closeNewCategoryDialog = () => {
        this.setState({newCategoryDialogOpen: false})
    }

    openListNameDialog = () => {
        this.setState({editListNameDialogOpen: true})
    }

    closeListNameDialog = () => {
        this.setState({editListNameDialogOpen: false})
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

                <h1 className="user-name-heading"
                    style={{fontWeight:"normal"}}
                    onClick={this.openListNameDialog}
                >
                    {this.props.userSession.userList.userName}
                </h1>

                <EditListNameDialog
                    isOpen={this.state.editListNameDialogOpen}
                    onRequestClose={this.closeListNameDialog}
                />

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
                        onClick={this.openNewCategoryDialog}/>
                </div>

                <CreateNewCatDialog
                    isOpen={this.state.newCategoryDialogOpen}
                    onRequestClose={this.closeNewCategoryDialog}
                />

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
        // createNewCategory: categoryName => dispatch(UserSessionActions.createNewCategory(categoryName)),
        // updateListName: newName => dispatch(UserSessionActions.updateUserName(newName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)