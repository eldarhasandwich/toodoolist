
class dbHandler {

    newCategoryTemplate = {
        categoryName: "",
        isOpen: true
    }

    newItemTemplate = {
        itemName: "",
        isComplete: false
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