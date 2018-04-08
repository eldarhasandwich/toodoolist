import React, {Component} from 'react';
import {connect} from 'react-redux'
import Item from '../Item/Item'

import '../../Styles/glitch.css'
// import './styles.css'

import CreateNewItemDialog from './CreateNewItemDialog';
import RenameCatDialog from './RenameCatDialog';

import * as UserSessionActions from './../../Actions/userSession'
import {RaisedButton, Paper, Checkbox} from 'material-ui';

import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

class Category extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newItemDialogOpen: false,
            changeCatNameDialogOpen: false,
            categoryItemsVisible: false
        }
    }

    openNewItemDialog = () => {
        this.setState({newItemDialogOpen: true})
    }

    closeNewItemDialog = () => {
        this.setState({newItemDialogOpen: false})
    }

    openChangeNameDialog = () => {
        this.setState({changeCatNameDialogOpen: true})
    }

    closeChangeNameDialog = () => {
        this.setState({changeCatNameDialogOpen: false})
    }

    getCategoryName = () => {
        return this.props.userSession.userList._CATEGORIES[this.props.categoryID].categoryName
    }

    getCompletedItemCount = () => {
        let items = this.props.userSession.userList._CATEGORIES[this.props.categoryID]._ITEMS
        if (items === undefined || items === null) {
            return "Nothing!"
        }

        let completedItems = Object
            .keys(items)
            .filter(x => items[x].isComplete)
            .length

        let totalItems = Object
            .keys(items)
            .length
        return `(${completedItems}/${totalItems})`
    }

    getCategoryItems = () => {
        if (!this.state.categoryItemsVisible) {
            return
        }

        let items = this.props.userSession.userList._CATEGORIES[this.props.categoryID]._ITEMS
        // console.log(items)
        if (items === undefined || items === null) {
            return <p>No items! Add some!</p>
        }

        let itemKeys = Object.keys(items)
        return itemKeys.map(x => 

                <Item
                    itemID={x}
                    categoryID={this.props.categoryID}
                    key={this.props.categoryID + x}
                />
        )
    }

    updateCategoryIsOpen = (event, isChecked) => {
        this.setState({categoryItemsVisible: isChecked})
    }

    categoryStyle = {
        width: "95%",
        margin: "5px auto",
        padding: "5px 0",
    }

    render() {
        return (
            <Paper style={this.categoryStyle} zDepth={2}>

                <div/> 

                <div style={{clear: "both"}}>

                    <div
                        style={{
                        width: "100%",
                        overflow: "auto",
                        marginLeft: "10px",
                        height: "38px",
                        marginTop: "5px"
                    }}>
                        <Checkbox
                            label={"Show Items"}
                            style={{
                            textAlign: "left",
                            float:"left",
                            width:"160px"
                        }}
                            checked={this.state.categoryItemsVisible}
                            onCheck={this.updateCategoryIsOpen}/>
                    </div>

                    <div style={{width:"100%", overflow:"auto"}}>
                        <h3
                            style={{
                            marginBottom: "3px",
                            marginTop: "0",
                            fontWeight: "normal",
                            cursor: "pointer"
                        }}
                            className={"category-name"}
                            onClick={this.openChangeNameDialog}>
                            {this.getCategoryName() + " - " + this.getCompletedItemCount()}
                        </h3>
                    </div>

                    <RenameCatDialog
                        isOpen={this.state.changeCatNameDialogOpen}
                        categoryID={this.props.categoryID}
                        getCategoryName={this.getCategoryName}
                        onRequestClose={this.closeChangeNameDialog}
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
                            label={"New Item"}
                            secondary
                            onClick={this.openNewItemDialog}/>
                    </div>

                    <CreateNewItemDialog
                        isOpen={this.state.newItemDialogOpen}
                        categoryID={this.props.categoryID}
                        getCategoryName={this.getCategoryName}
                        onRequestClose={this.closeNewItemDialog}/> 
                        
                    
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
        createNewItem: (categoryID, itemName) => dispatch(UserSessionActions.createNewItem(categoryID, itemName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)