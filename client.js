const prompt = require('prompt-sync')()

fetch(`http://localhost:3000/users/1`, {
    method: 'DELETE'
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    })