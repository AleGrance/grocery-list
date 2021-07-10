// Query selectors
const form = document.querySelector(".grocery-form");
const submitBtn = document.querySelector(".submit-btn");
const alert = document.querySelector(".alert");

const grocery = document.getElementById("itemTitle");


// Add Event Listeners
form.addEventListener("submit", addItem);




// Functions
function addItem(e) {

    // Prevent page reloading
    e.preventDefault();

    const value = grocery.value;
    const id = new Date().getTime().toString();

    console.log(id, value);

    showAlert("Agregado!", "success");
}

function showAlert(textContent, type) {
    alert.textContent = textContent;
    alert.classList.add(type);
}