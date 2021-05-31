import ToDo from "./modules/toDo.js";
import ListItem from "./modules/list-item.js";

let ul = document.querySelector("#ul");
const toDoList = new ListItem(ul);
let pressedArr = [];

ul.addEventListener("mousedown", function (e) {
    e.preventDefault();
});

ul.addEventListener("click", function (e) {
    let isPressed = 1;
    if (e.target == this) {
        return false;
    }

    if (e.target.classList.length && !e.altKey) {
        removeSelected(e.target);
        isPressed = 0;
    }

    if (e.ctrlKey) {
        removeSelected(e.target);
        isPressed = 0;
    }

    if (!e.altKey && !e.ctrlKey && !e.shiftKey) {
        clearSelected(this.children);
    }

    if (e.shiftKey) {
        for (let i = 0; i < this.children.length; i++) {
            const element = this.children.item(i).textContent;
            if (e.target.textContent === element) {
                for (let j = i; j >= 0; j--) {
                    const item = this.children.item(j);
                    if (item.classList.length) {
                        return false;
                    }
                    addSelected(item);
                }
            }
        }
        isPressed = 0;
    }

    if (isPressed) {
        addSelected(e.target);
    }
});

let btn = document.querySelector(".btn-box");
let btnAddStart = document.getElementById("btn-add-start");
let btnAddEnd = document.getElementById("btn-add-end");
let btnTransfer = document.getElementById("btn-transfer");
let btnRemove = document.getElementById("btn-remove");

btn.addEventListener("mousedown", function (e) {
    e.preventDefault();
});

btn.addEventListener("click", function (e) {
    if (e.target == this) {
        return false;
    }

    if (e.target == btnRemove) {
        pressedArr.forEach((element) => {
            toDoList.removeById(element);
        });
        pressedArr = [];
    }

    if (e.target == btnAddStart) {
        let id = ++ToDo.count;
        let toDoCase = new ToDo({
            name: "Task",
            id,
        });
        toDoList.addStart(toDoCase);
    }

    if (e.target == btnTransfer) {
        pressedArr.forEach((element) => {
            let child = toDoList.HTMLContainer.querySelector(
                `[data-id ="${element}"]`
            );
            toDoList.HTMLContainer.prepend(child);
        });
    }

    if (e.target == btnAddEnd) {
        let id = ++ToDo.count;
        let toDoCase = new ToDo({
            name: "Task",
            id,
        });
        toDoList.addEnd(toDoCase);
    }

});

function clearSelected(elems) {
    for (let elem of elems) {
        elem.classList.remove("selected");
    }
    pressedArr = [];
}

function addSelected(elem) {
    elem.classList.add("selected");
    let child1 = elem.dataset.id;
    pressedArr.push(child1);
}
function removeSelected(elem) {
    let index = pressedArr.indexOf(elem.dataset.id);
    if (index > -1) {
        pressedArr.splice(index, 1);
    }
    elem.classList.remove("selected");
}
