import Fire from '../_Classes/Fire'
import DatabaseHandler from  '../_Classes/DatabaseHandler'

export function setUserID (newUserID) {
    return {
        type: "SET_USER_ID",
        newUserID
    }
}

export function setUserList (newUserList) {
    return {
        type: "SET_USER_LIST",
        newUserList
    }
}



export function getUserList (userID) {
    return (dispatch, getState) => {

        Fire
            .database()
            .ref("_USERS/" + userID)
            .on("value", function (snapshot) {
                console.log(userID)
                dispatch(setUserID(userID))
                dispatch(setUserList(snapshot.val()))
            }, function (error) {
                console.log(`userID "${userID}" does not exist`)
            })
    }
}

export function createNewCategory (categoryName) {
    return (dispatch, getState) => {
        let state = getState()
        let userID = state.userSession.userID

        Fire
            .database()
            .ref("_USERS/" + userID + "/_CATEGORIES")
            .push()
            .set(
                DatabaseHandler.createNewCategory(categoryName)
            )

    }
}

export function createNewItem (categoryID, itemName) {
    return (dispatch, getState) => {
        let state = getState()
        let userID = state.userSession.userID

        Fire
            .database()
            .ref("_USERS/" + userID + "/_CATEGORIES/" + categoryID + "/_ITEMS")
            .push()
            .set(
                DatabaseHandler.createNewItem(itemName)
            )

    }
}

// export function updateCategoryIsOpen (categoryID, boolean) {
//     return {
//         type: "UPDATE_CATEGORY_ISOPEN",
//         categoryID,
//         boolean
//     }

// }

export function updateItemIsComplete (categoryID, itemID, boolean) {
    return (dispatch, getState) => {
        let state = getState()
        let userID = state.userSession.userID

        Fire
            .database()
            .ref("_USERS/" + userID + "/_CATEGORIES/" + categoryID + "/_ITEMS/" + itemID)
            .update(
                {isComplete: boolean}
            )
    }
}
