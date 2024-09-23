const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Name : Mohammadreza Parsafard - Student ID : 121755235');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
