const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3243;

// Serve static files from the public folder
app.use(express.static('public'));

// Redirect root route ('/') to '/about'
app.get('/', (req, res) => {
    res.redirect('/about');
});

// Serve about.html when '/about' is accessed
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Serve articles.json for /articles route
app.get('/articles', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'articles.json'));
});

// Serve categories.json for /categories route
app.get('/categories', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'categories.json'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
