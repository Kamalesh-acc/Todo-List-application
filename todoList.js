let taskContainer = document.getElementById("taskContainer");
let add = document.getElementById("addBtn");
let saved = document.getElementById("saveBtn");
let img = document.getElementById("taskImg");
let completed = document.getElementById("completedNum");
let remaining = document.getElementById("remainingNum");



function LocalStorage() {
    let inString = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(inString);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = LocalStorage();

function saveInLocal() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function completion() {
    let comp = 0;
    for (let eachEl of todoList) {
        if (eachEl.isChecked) {
            comp += 1;
        }
    }


    completedNum = comp;
    completed.textContent = completedNum;
    remaining.textContent = remainingNum;

    len = todoList.length;

    remainingNum = len - completedNum;
    remaining.textContent = remainingNum;
}
completion();



function checkEmpty() {
    if (todoList.length === 0) {
        img.classList.remove("d-none");
    } else {
        img.classList.add("d-none");
    }
}
checkEmpty();

function toadd() {
    console.log(todoList.length);



    let inputEl = document.getElementById("taskInput");
    let inputvalue = inputEl.value.trim();
    len += 1;
    if (inputvalue === "") {
        alert("Enter Valid Text");
        return;
    }

    let temp = {
        text: inputvalue,
        uniqueNo: len,
        isChecked: false
    };
    todoList.push(temp);
    console.log(todoList);
    createTask(temp);

    inputEl.value = "";
    saveInLocal();
    checkEmpty();


}

function status(labelId, todoId) {

    let labelEl = document.getElementById(labelId);
    labelEl.classList.toggle('checked');

    let checkedId = todoList.findIndex(function(eachEl) {
        let eachElCheck = "todo" + eachEl.uniqueNo;
        if (todoId === eachElCheck) {
            console.log("eachElCheck");
            return true;
        }
    });

    let todoCheckEl = todoList[checkedId];

    if (todoCheckEl.isChecked === true) {
        todoCheckEl.isChecked = false;

    } else {
        todoCheckEl.isChecked = true;
        console.log("isChecked = false");
    }
    saveInLocal();
    completion();
}




add.onclick = function() {
    toadd();
    completion()

};
let inputEl = document.getElementById("taskInput");


inputEl.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        toadd();
    }
});

function deleteEl(todoId) {

    let todoElement = document.getElementById(todoId);
    taskContainer.removeChild(todoElement);

    let delIndex = todoList.findIndex(function(eachTodo) {
        let eachElCheck = "todo" + eachTodo.uniqueNo;
        if (eachElCheck === todoId) {
            return true;
        } else {
            return false;
        }
    });

    todoList.splice(delIndex, 1);
    saveInLocal();
    checkEmpty();
    completion();
}






function createTask(todo) {
    let labelId = "label" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("task-each-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    taskContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);
    inputElement.checked = todo.isChecked;

    inputElement.onclick = function() {
        status(labelId, todoId);
    };




    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    labelContainer.appendChild(labelElement);
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    let editContainer = document.createElement("div");
    editContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(editContainer);

    let editButton = document.createElement("i");







    editButton.classList.add("far", "fa-edit", "edit-icon");
    editContainer.appendChild(editButton);


    editButton.onclick = function() {
        let newText = prompt("Enter the new text for this task:", todo.text);
        if (newText.trim() !== "") {
            todo.text = newText.trim();
            labelElement.textContent = todo.text;
            saveInLocal();
        } else {
            alert("Please enter valid text.");
        }
    };


    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteContainer.appendChild(deleteIcon);

    deleteIcon.onclick = function() {
        deleteEl(todoId);

    };
}

for (let todo of todoList) {
    createTask(todo);
}