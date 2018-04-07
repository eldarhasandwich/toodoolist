const defaultState = {
    userID: null,
    userList: {},
    listIsLoading: false,
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

        // case "UPDATE_CATEGORY_ISOPEN": {
        //     return {
        //         ...state,
        //         userList: {
        //             ...state.userList,
        //             _CATEGORIES: {
        //                 ...state.userList._CATEGORIES,
        //                 [action.categoryID]: {
        //                     ...state.userList._CATEGORIES[action.categoryID],
        //                     isOpen: action.boolean
        //                 }
        //             }
        //         }
        //     }
        // }

        case "SET_LIST_IS_LOADING": {
            return {
                ...state,
                listIsLoading: action.boolean
            }
        }

        default: {
            return state
        }
    }
}

export default userSession