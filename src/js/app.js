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


// Functions
function addItem(e) {

    // Prevent page reloading
    e.preventDefault();

    // Set the item values
    const value = grocery.value;
    const id = new Date().getTime().toString();

    if (value) {
        // Call the function that creates the itemRow
        createItem(id, value);

        // Display alert
        showAlert("Agregado!", "success");

        // Set back to default
        setBackToDefault();
    } else {
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

    // Show the grocery container
    groceryContainer.classList.add("show-container");
}

// Delete Item
function deleteItem(id) {

}

// Edit Item
function editItem(id, value) {

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