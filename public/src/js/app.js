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
let editId = "";

// When the app starts!
window.addEventListener("DOMContentLoaded", loadList);

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
        showAlert("Agregado!", "success");

        // Add to localStorage
        addToLocalStorage(id, value);

        // Show the grocery container
        groceryContainer.classList.add("show-container");

        // Set back to default
        setBackToDefault();
    } else if (value && editFlag) {
        editElement.textContent = value;
        console.log("Edited");

        // Edit from localStorage
        editFromLocalStorage(value);

        // Display alert
        showAlert("Item editado!", "success");

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
    <article id="art-${value}">${value}</article>
    <div class="btn-container">
        <input id="${value}" type="checkbox" onclick="lineaEncima(id)">
        <button class="btn-edit" type="button"><i class="fa fa-edit"></i></button>
        <button class="btn-delete" type="button"><i class="fa fa-trash"></i></button>
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
}

// Delete Item
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.id;

    // Remove the element
    groceryList.removeChild(element);

    removeFromLocalStorage(id);

    // Hide container if the list is empty
    if (groceryList.children.length === 0) {
        groceryContainer.classList.remove("show-container");
    }

    showAlert("Item eliminado!", "danger");
    setBackToDefault();
}

// Tachar texto al marcar el checkbox
function lineaEncima(id) {
    checkBoxID = id;
    checkBoxMarcado = document.getElementById(checkBoxID);

    // Si el checkbox esta marcado se tacha el texto
    if (checkBoxMarcado.checked === true) {
        textoID = "art-" + id;

        let textoAtachar = document.getElementById(textoID);
        textoAtachar.style.textDecoration = ' line-through';
    } else {
        textoID = "art-" + id;

        let textoAtachar = document.getElementById(textoID);
        textoAtachar.style.textDecoration = 'none';
    }

}

// Edit Item
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.id;

    editFlag = true;
    editId = id;

    console.log("The id is: ", editId);

    // set the element target to a editElement variable - is set only the data that wish to edit
    editElement = e.currentTarget.parentElement.previousElementSibling;
    console.log(editElement.textContent);

    grocery.value = editElement.textContent;

    submitBtn.textContent = "Editar";

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

    // Remove from localStorage
    localStorage.removeItem("ItemList");

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
    submitBtn.textContent = "Agregar";
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

// Add to localStorage
function addToLocalStorage(id, value) {
    const item = {
        id,
        value
    };

    const items = getLocalStorage();
    console.log(items);

    items.push(item);
    localStorage.setItem("ItemList", JSON.stringify(items));
}

// Edit from localStorage
function editFromLocalStorage(value) {
    console.log("This is the data form the function: ", editId, value);

    const items = getLocalStorage();

    items.forEach(function (item) {
        if (item.id === editId) {
            item.value = value;
        }
    })

    localStorage.setItem("ItemList", JSON.stringify(items));

}

// Remove from localStorage
function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    items = items.filter(function (item) {
        if (item.id !== id) {
            return item;
        }
    })

    localStorage.setItem("ItemList", JSON.stringify(items));

}

function getLocalStorage() {
    // checks if there is some data in localStorage - if not asing an empty array [] if yes asing the existing array [{""}]
    return items = localStorage.getItem("ItemList") ? JSON.parse(localStorage.getItem("ItemList")) : [];
}

// Load list
function loadList() {
    const items = getLocalStorage();
    console.log(items);
    console.log(items.length);

    if (items.length > 0) {
        items.forEach(function (item) {
            createItem(item.id, item.value);
        })

        // Show the grocery container
        groceryContainer.classList.add("show-container");
    }
}