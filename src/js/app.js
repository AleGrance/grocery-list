// Query selectors
const form = document.querySelector(".grocery-form");
const submitBtn = document.querySelector(".submit-btn");
const alert = document.querySelector(".alert");
const groceryContainer = document.querySelector(".grocery-container");

const grocery = document.getElementById("itemTitle");
const groceryList = document.getElementById("grocery-list");
const clearBtn = document.getElementById("clear-btn");


// Add Event Listeners
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);

// Options
let editFlag = false;
let editElement;

// Functions
function addItem(e) {

    // Prevent page reloading
    e.preventDefault();

    // Set the item values
    const value = grocery.value;
    const id = new Date().getTime().toString();

    if (value && !editFlag) {
        // Call the function that creates the itemRow
        createItem(id, value);

        // Display alert
        showAlert("Added!", "success");

        // Set back to default
        setBackToDefault();
    } else if (value && editFlag) {
        editElement.textContent = value;
        console.log("Editado");

        // Display alert
        showAlert("Item edited!", "success");

        // Set back to default
        setBackToDefault();
    } else {
        // Display alert
        showAlert("Campo vacio!", "danger");
    }
}

// Create Item Row with the item values
function createItem(id, value) {
    // Create a new element
    const element = document.createElement("div");

    // Set the element attributes
    element.classList.add("itemRow");
    element.setAttribute("id", id);

    // Add elements to the element
    element.innerHTML = `
    <article>${value}</article>
    <div class="btn-container">
        <button class="btn-delete" type="button"><i class="fa fa-trash"></i></button>
        <button class="btn-edit" type="button"><i class="fa fa-edit"></i></button>
    </div>
    `
    // Add the element created to the Grocery list DOM
    groceryList.appendChild(element);

    // Create the event listeners for the btns
    const btnDelete = element.querySelector('.btn-delete');
    const btnEdit = element.querySelector('.btn-edit');

    // Call the functions
    btnDelete.addEventListener('click', deleteItem);
    btnEdit.addEventListener('click', editItem);

    // Show the grocery container
    groceryContainer.classList.add("show-container");
}

// Delete Item
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    console.log(element.id);

    // Remove the element
    groceryList.removeChild(element);

    // Hide container if the list is empty
    if (groceryList.children.length === 0) {
        groceryContainer.classList.remove("show-container");
    }

    showAlert("Item deleted successfully!", "danger");
    setBackToDefault();
}

// Edit Item
function editItem(e) {
    editFlag = true;
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.id;

    console.log("El id es: ", id);

    // set the element target to a editElement variable - is set only the data that wish to edit
    editElement = e.currentTarget.parentElement.previousElementSibling;
    console.log(editElement.textContent);

    grocery.value = editElement.textContent;

    submitBtn.textContent = "Edit Item";

}

// Clear the list of items
function clearItems() {
    const items = document.querySelectorAll(".itemRow");
    console.log(items);

    if (items.length > 0) {
        items.forEach(function (item) {
            groceryList.removeChild(item);
        });
    }

    // Hide the grocery container
    groceryContainer.classList.remove("show-container");

    // Display alert
    showAlert("Lista vacia!", "danger");

    // Set back to default
    setBackToDefault();
}

// Set back to default - Function
function setBackToDefault() {
    grocery.value = "";
    submitBtn.textContent = "Add";
    editFlag = false;
}

// Show alert - Function
function showAlert(textContent, type) {
    alert.textContent = textContent;
    alert.classList.add(type);

    setTimeout(function () {
        alert.classList.remove(type);
        alert.textContent = "";
    }, 1000);

}