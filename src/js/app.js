// Query selectors
const form = document.querySelector(".grocery-form");
const submitBtn = document.querySelector(".submit-btn");
const alert = document.querySelector(".alert");
const groceryContainer = document.querySelector(".grocery-container");

const grocery = document.getElementById("itemTitle");
const groceryList = document.getElementById("grocery-list");


// Add Event Listeners
form.addEventListener("submit", addItem);



// Functions
function addItem(e) {

    // Prevent page reloading
    e.preventDefault();

    // Set the item values
    const value = grocery.value;
    const id = new Date().getTime().toString();

    console.log(id, value);

    // Call the function that creates the itemRow
    createItem(id, value);

    showAlert("Agregado!", "success");
}

// Show alert
function showAlert(textContent, type) {
    alert.textContent = textContent;
    alert.classList.add(type);
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

    groceryContainer.classList.add("show-container");
}