import Fire from '../_Classes/Fire'
import DatabaseHandler from '../_Classes/DatabaseHandler'

export function setUserID(newUserID) {
    return {type: "SET_USER_ID", newUserID}
}

export function setUserList(newUserList) {
    return {type: "SET_USER_LIST", newUserList}
}

export function setListIsLoading(boolean) {
    return {type: "SET_LIST_IS_LOADING", boolean}
}

export function setListKeyIsIncorrectMsg(boolean) {
    return {type: "SET_LISTKEY_INCORRECT_MSG", boolean}
}


//FIREBASE CALLS

export function updateUserName(newName) {
    return (dispatch, getState) => {

        let state = getState()
        let userID = state.userSession.userID

        Fire
            .database()
            .ref("_USERS/" + userID)
            .update({userName: newName})

    }
}

export function updateCategoryName(categoryID, newName) {
    return (dispatch, getState) => {
        let state = getState()
        let userID = state.userSession.userID

        Fire
            .database()
            .ref("_USERS/" + userID + "/_CATEGORIES/" + categoryID)
            .update({categoryName: newName})

    }
}

export function createNewUser() {
    return (dispatch, getState) => {

        console.log("Creating new user")

        let newRef = Fire
            .database()
            .ref("_USERS")
            .push()
            .getKey()

        Fire
            .database()
            .ref("_USERS")
            .child(newRef)
            .set(DatabaseHandler.createNewUser())
            .then(() => {
                // console.log("new user")

                // console.log(newRef)
                var params = new URLSearchParams(window.location.search);
                params.set('k', newRef);
                window.location.search = params.toString();
            })

    }
}

export function getUserList(userID) {
    return (dispatch, getState) => {

        dispatch(setListIsLoading(true))

        Fire
            .database()
            .ref("_USERS/" + userID)
            .on("value", function (snapshot) {
                if (snapshot.val() === null) {
                    console.log(`userID "${userID}" does not exist`)
                    dispatch(setListKeyIsIncorrectMsg(true))
                    dispatch(setListIsLoading(false))
                    // window.history.replaceState(null, null, window.location.pathname);
                    return
                }

                dispatch(setListKeyIsIncorrectMsg(false))
                dispatch(setUserID(userID))
                dispatch(setUserList(snapshot.val()))

                dispatch(setListIsLoading(false))
            }, function (error) {
                console.log(`userID "${userID}" does not exist`)

                dispatch(setListIsLoading(false))
            })
    }
}

export function createNewCategory(categoryName) {
    return (dispatch, getState) => {
        let state = getState()
        let userID = state.userSession.userID

        Fire
            .database()
            .ref("_USERS/" + userID + "/_CATEGORIES")
            .push()
            .set(DatabaseHandler.createNewCategory(categoryName))

    }
}

export function createNewItem(categoryID, itemName) {
    return (dispatch, getState) => {
        let state = getState()
        let userID = state.userSession.userID

        Fire
            .database()
            .ref("_USERS/" + userID + "/_CATEGORIES/" + categoryID + "/_ITEMS")
            .push()
            .set(DatabaseHandler.createNewItem(itemName))

    }
}

export function updateItemIsComplete(categoryID, itemID, boolean) {
    return (dispatch, getState) => {
        let state = getState()
        let userID = state.userSession.userID

        Fire
            .database()
            .ref("_USERS/" + userID + "/_CATEGORIES/" + categoryID + "/_ITEMS/" + itemID)
            .update({isComplete: boolean})
    }
}

export function deleteCategory(categoryID) {
    return (dispatch, getState) => {
        let state = getState()
        let userID = state.userSession.userID

        Fire
            .database()
            .ref("_USERS/" + userID + "/_CATEGORIES/" + categoryID)
            .remove()
    }
}

export function deleteItem(categoryID, itemID) {
    return (dispatch, getState) => {
        let state = getState()
        let userID = state.userSession.userID

        Fire
            .database()
            .ref("_USERS/" + userID + "/_CATEGORIES/" + categoryID + "/_ITEMS/" + itemID)
            .remove()
    }
}