const form = document.querySelector('#add-todo')
const input = document.querySelector('#todoItem') // select the todo input
let ul = document.querySelector('ul')
const checkbox = document.querySelector('.checkbox') 
const clearBtn = document.querySelector('#clear') // button to clear done items
const saveBtn = document.querySelector('#save') // save list button

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let newLi = document.createElement("li");
    newLi.innerText = input.value;
    ul.append(newLi); //add the new todo item onto the bottom of the ul
    input.value = ""; //make input entry blank again for better UX
    const newCheck = document.createElement("input");
    newCheck.type = "checkbox"; // make a new checkbox to put next to the new todo
    newLi.prepend(newCheck);
})

// event delegation to ul. if you click on the checkbox, add a linethrough and change color
ul.addEventListener("click", function(event) {
    if (event.target.tagName === "INPUT") {
            if (event.target.checked === true) {
            event.target.parentElement.style.textDecoration = "line-through";
            event.target.parentElement.style.color = "#2F688E";
            }
            else {
                event.target.parentElement.style.textDecoration = "none";
                event.target.parentElement.style.color = "white";
            }

    }
})

// remove the done todo elements. 
clearBtn.addEventListener("click", function() {
    let itemList = ul.querySelectorAll('li'); // put li's into an iterable list
    for (item of itemList) { // loop through list, determing if checkbox is checked
        if (item.firstElementChild.checked === true) {
            item.remove(); // remove items that are checked
        }
    }
})

// save items on list in local storage
saveBtn.addEventListener('click', function() {
    let items = []
    let savedList = ul.querySelectorAll('li'); // put li'into an iterable list
    for (item of savedList) {
        items.push(item.innerText) // push a todo item's text into the list
    }
    localStorage.setItem('savedList', JSON.stringify(items))
    console.log("clicked saved");
    console.log(ul)
})

// load savedList from localStorage when page loads
window.addEventListener('load', function() {
    listInStorage = localStorage.getItem('savedList') //check to see if a saved list exists
    let ul = document.querySelector('ul') // initialize a ul
    if (listInStorage) {
        savedList = JSON.parse(listInStorage);
        for (item of savedList) {
            let newLi = document.createElement("li");
            newLi.innerText = item;
            ul.append(newLi);
            //add the new todo item onto the bottom of the ul
            const addCheck = document.createElement("input");
            addCheck.type = "checkbox"; // make a new checkbox to put next to the new todo
            newLi.prepend(addCheck);
        }
         
    } 
})









