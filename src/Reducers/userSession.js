const defaultState = {
    userID: null,
    userList: {},
    listIsLoading: false,
    listKeyIncorrentMsg: false
}


const userSession = (state = defaultState, action) => {
    switch (action.type) {

        case "SET_USER_ID": {
            return {
                ...state,
                userID: action.newUserID
            }            
        }

        case "SET_USER_LIST": {
            return {
                ...state,
                userList: action.newUserList
            }            
        }

        case "SET_LIST_IS_LOADING": {
            return {
                ...state,
                listIsLoading: action.boolean
            }
        }

        case "SET_LISTKEY_INCORRECT_MSG": {
            return {
                ...state,
                listKeyIncorrentMsg: action.boolean
            }
        }

        default: {
            return state
        }
    }
}

export default userSession