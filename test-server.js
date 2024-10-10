const fs = require('fs');
const express = require('express');

const port = 3000;
const app = express();

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Alber Johnson" }
]

/* app.get("/users", (req, res) => {
  console.log(req.query)
  const {name} = req.query;
  
  
  const result = users.filter((user) => user.name.toLowerCase().includes(name.toLowerCase()));
  res.json(result);
  }) */
app.use(express.json())
 
/* app.post('/users', (req, res) => {
  const newUser = req.body;
  console.log(req.body);
  
  newUser.id = users.length + 1;
  users.push(newUser);
  res.status(201).json(newUser);
}) */


/* app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  const userIndex = users.findIndex(user => user.id === parseInt(id));

  if (userIndex !== -1) {
    users[userIndex] = {...users[userIndex], ...updatedUser}
    res.json(users);
  } else {
    res.status(404).json({message: 'User not found'})
  }
}) */

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex(user => user.id === parseInt(id));

  if(userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json(users)
  } else {
    res.status(404).json({message: 'User not found'})
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})