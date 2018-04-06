const defaultState = {
    userID: null,
    userList: {}

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


        default: {
            return state
        }
    }
}

export default userSession