
class dbHandler {

    newUserTemplate = {
        userName: "My New List!"
    }

    newCategoryTemplate = {
        categoryName: "",
    }

    newItemTemplate = {
        itemName: "",
        isComplete: false
    }

    createNewUser = () => {
        return {...this.newUserTemplate}
    }

    createNewCategory = (name) => {
        return {...this.newCategoryTemplate, categoryName: name}
    }

    createNewItem = (name) => {
        return {...this.newItemTemplate, itemName: name}
    }

}

let DatabaseHandler = new dbHandler();

export default DatabaseHandler