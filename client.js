const prompt = require('prompt-sync')();
const { port } = require('./server');

function getTodos() {
    fetch(`http://localhost:${port}/todos/`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(`Failed to fetch todos! Error: ${err}`))
}

function addTodo() {
    const newTodo = prompt("Please add your new todo: ");
    fetch(`http://localhost:${port}/todos/add/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({todo: newTodo})
    })
    .then(res => res.json())
    .then(data => console.log(`You sucessfully added ${data} todo to the list!`))
    .catch(err => console.log(`Failed to add todo! Error: ${err}`))
}

function updatedTodo() {
    const todoId = prompt('Please enter the id of the todo you want to update: ');
    const updatedTodo = prompt('Please enter the new todo: ');
    fetch(`http://localhost:${port}/todos/update/${todoId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({newTodo: updatedTodo})
    })
    .then(res => res.json())
    .then(data => console.log(`You successfuly updated todo with: ${data}`))
    .catch(err => console.log(`Failed to update todo! Error: ${err}`))
}

function deleteTodo() {
    const todoId = prompt('Please enter the id of the todo you want to delete: ');

    fetch(`http://localhost:${port}/todos/delete/${todoId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    })
}


const command = prompt("Please enter your command (get, add, update, delete): ");
switch(command) {
    case "get":
        getTodos()
        break;
    case "add":
        addTodo()
        break;
    case "update":
        updatedTodo()
        break;
    case "delete":
        deleteTodo()
        break;
    default:
        console.log("Unkown command!")    
}