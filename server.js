import express from 'express';
const app = express();
const port = 3000;

// Adatminták
const users = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alicejohnson@example.com'   
 }
];

// Felhasználók lekérdezése (szűréssel)
app.get('/users', (req, res) => {
  const { name, email } = req.query;
  let filteredUsers = users;

  if (name) {
    filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));   

  }

  if (email) {
    filteredUsers = filteredUsers.filter(user => user.email.toLowerCase().includes(email.toLowerCase()));
  }

  res.json(filteredUsers);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});