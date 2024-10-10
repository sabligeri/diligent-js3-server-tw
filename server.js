const fs = require('fs');
const express = require('express');

const port = 4001;
const app = express();

app.use(express.json());

const database = 'data.json'

let todos = JSON.parse(fs.readFileSync(database, 'utf-8'));

function nextId(todos) {
    const ids = todos.map(todo => todo.id);
    if (ids.length === 0) {
      return 1;
    }
    const maxId = Math.max(...ids);
    return maxId + 1;
  }

  function writeFile(todo) {
    fs.writeFileSync(database, JSON.stringify(todo, null, 1), 'utf-8')
  }

//GET
app.get('/todos', (req, res) => {
    console.log(todos);
})


//POST
app.post('/todos/add', (req, res) => {
    const newTodo = req.body.todo;

    if(!newTodo){
        console.log("You should add a todo!");
    }

    todos.push({id: nextId(todos), todo: newTodo});
    writeFile(todos);
    res.status(201).json(newTodo);
   // console.log(`Congratulation you successfuly added your new todo: ${newTodo}`);
})


//PUT
app.put('/todos/update/:id', (req, res) => {
    const {id} = req.params;
    const {newTodo} = req.body;

    const filteredTodoIndex = todos.findIndex(todo => todo.id === parseInt(id));

    if(filteredTodoIndex !== -1) {
        todos[filteredTodoIndex].todo = newTodo;
        writeFile(todos);
        res.json("Todo succesfully updated!")
    } else {
        console.log(`Todo is not found with id: ${id}`);
    }
})


//DELETE
app.delete('/todos/delete/:id', (req, res) => {
    const {id} = req.params;

    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));

    if(todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        writeFile(todos);
        res.json(`Todo with id: ${id} is successfuly deleted!`)
    } else {
        console.log(`Todo is not found with id: ${id}`);
    }
})




app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})

module.exports = { port };