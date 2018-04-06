import React, {Component} from 'react';
import {connect} from 'react-redux'
import Item from '../Item/Item'

import * as UserSessionActions from './../../Actions/userSession'
import { RaisedButton, Dialog, TextField, Paper, Checkbox } from 'material-ui';

class Category extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newItemDialogOpen: false,
            newItemName: ""
        }
    }

    openDialog = () => {
        this.setState({newItemDialogOpen: true})
    }

    closeDialog = () => {
        this.setState({newItemDialogOpen: false})
    }

    getCategoryName = () => {
        return this.props.userSession.userList._CATEGORIES[this.props.categoryID].categoryName
    }

    getCategoryItems = () => {
        if (!this.props.userSession.userList._CATEGORIES[this.props.categoryID].isOpen) {
            return
        }

        let items = this.props.userSession.userList._CATEGORIES[this.props.categoryID]._ITEMS
        // console.log(items)
        if (items === undefined || items === null) {
            return <p>No items! Add some!</p>
        }

        let itemKeys = Object.keys(items)
        return itemKeys.map(x => <Item itemID={x} categoryID={this.props.categoryID} key={this.props.categoryID + x}/>)
    }

    createNewItem = () => {
        this.props.createNewItem(this.props.categoryID, "new item")
    }

    setNewItemName = (newName) => {
        this.setState({newItemName: newName.target.value})
        // console.log(this.state.newItemName)
    }

    resetNewItemName = () => {
        this.setState({newItemName: ""})
    }

    createNewItem = () => {
        this.props.createNewItem(this.props.categoryID, this.state.newItemName)
        this.resetNewItemName()
        this.closeDialog()
    }
    
    updateCategoryIsOpen = (event, isChecked) => {
        // console.log(isChecked)

        this.props.updateCategoryIsOpen(this.props.categoryID, isChecked)
    }

    categoryStyle = {
        width: "95%",
        margin: "5px auto",
        padding: "5px 0"
        // margin: "auto",
    }

    render() {
        return (
            <Paper style={this.categoryStyle} zDepth={2}>


                <div>

                    <div style={{width:"100%", overflow:"auto", marginLeft: "10px", height: "38px", marginTop: "5px"}}>
                        <Checkbox
                            label={"Show Items"}
                            style={{textAlign: "left"}}
                            checked={this.props.userSession.userList._CATEGORIES[this.props.categoryID].isOpen}
                            onCheck={this.updateCategoryIsOpen}
                        />
                    </div>

                    <h3 style={{marginBottom: "3px", marginTop: "0"}}>{this.getCategoryName()}</h3>
                    {/* <button onClick={this.createNewItem}>Create new Item</button> */}

                    <div style={{width:"100%", overflow:"auto"}}>
                        <RaisedButton
                            style={{float: "right", marginRight: "10px", marginBottom: "5px"}}
                            label={"New Item"}
                            disabled={!this.props.userSession.userList._CATEGORIES[this.props.categoryID].isOpen}
                            secondary
                            onClick={this.openDialog}
                        />
                    </div>

                    <Dialog
                        title={"Create a new Item under '" + this.getCategoryName() + "'"}
                        open={this.state.newItemDialogOpen}
                        onRequestClose={this.closeDialog}
                    >
                        <TextField
                            floatingLabelText={"Item Name"}
                            onChange={this.setNewItemName}
                            value={this.state.newItemName}
                        />

                        <div style={{width:"100%", overflow:"auto"}}>
                            <RaisedButton
                                style={{float: "right"}}
                                primary
                                onClick={this.createNewItem}
                                label={"Create Item"}
                            />
                        </div>
                    </Dialog>

                    {this.getCategoryItems()}
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
        createNewItem: (categoryID, itemName) => dispatch(UserSessionActions.createNewItem(categoryID, itemName)),
        updateCategoryIsOpen: (categoryID, boolean) => dispatch(UserSessionActions.updateCategoryIsOpen(categoryID, boolean))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)