import React, {Component} from 'react';
import {connect} from 'react-redux'
import Item from '../Item/Item'

import '../../Styles/glitch.css'
// import './styles.css'

import CreateNewItemDialog from './CreateNewItemDialog';
import RenameCatDialog from './RenameCatDialog';

import * as UserSessionActions from './../../Actions/userSession'
import {RaisedButton, Paper, Checkbox, LinearProgress} from 'material-ui';

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

    getItemCompletedTotal = () => {
        let items = this.props.userSession.userList._CATEGORIES[this.props.categoryID]._ITEMS
        if (items === undefined || items === null) {
            return null
        }

        let completedItems = Object
            .keys(items)
            .filter(x => items[x].isComplete)
            .length

        let totalItems = Object
            .keys(items)
            .length

        return {
            complete: completedItems,
            total: totalItems
        }
    }

    getPercentBarColor = (numer, denom) => {
        let frac = numer / denom

        if (frac === 1) {
            return "#557CFF"
        }

        if (frac < 0.5) {
            let g = ((frac*2)*256)
            g = Math.ceil(g).toString(16)
            console.log(`#ff${g}00`)
            return `#ff${g}00`
        } else {
            let r = 256 - (((frac-0.5)*2)*256)
            r = Math.ceil(r).toString(16)
            console.log(`#${r}ff00`)
            return `#${r}ff00`
        }
        

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
        return itemKeys.map(x => <Item
            itemID={x}
            categoryID={this.props.categoryID}
            key={this.props.categoryID + x}/>)
    }

    updateCategoryIsOpen = (event, isChecked) => {
        this.setState({categoryItemsVisible: isChecked})
    }

    categoryStyle = {
        width: "95%",
        margin: "5px auto",
        padding: "5px 0"
    }

    render() {
        let itemCompletion = this.getItemCompletedTotal()
        return (
            <Paper style={this.categoryStyle} zDepth={2}>

                <LinearProgress
                    mode="determinate"
                    value={(itemCompletion.complete/itemCompletion.total)*100}
                    style={{
                        height: "7px",
                        width: "98%",
                        margin: "auto"
                    }}
                    color={this.getPercentBarColor(itemCompletion.complete, itemCompletion.total)}/>

                <div style={{
                    clear: "both"
                }}>

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
                            float: "left",
                            width: "160px"
                        }}
                            checked={this.state.categoryItemsVisible}
                            onCheck={this.updateCategoryIsOpen}/>
                    </div>

                    <div
                        style={{
                        width: "100%",
                        overflow: "auto"
                    }}>
                        <h3
                            style={{
                            marginBottom: "3px",
                            marginTop: "0",
                            fontWeight: "normal",
                            cursor: "pointer"
                        }}
                            className={"category-name"}
                            onClick={this.openChangeNameDialog}>
                            {`${this.getCategoryName()} - (${itemCompletion.complete}/${itemCompletion.total})`}
                        </h3>
                    </div>

                    <RenameCatDialog
                        isOpen={this.state.changeCatNameDialogOpen}
                        categoryID={this.props.categoryID}
                        getCategoryName={this.getCategoryName}
                        onRequestClose={this.closeChangeNameDialog}/>

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
                        onRequestClose={this.closeNewItemDialog}/> {this.getCategoryItems()}

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