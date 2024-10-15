const express = require('express');
const path = require('path');
const contentService = require('./content-service');  // Import the content service

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

// Route to fetch published articles from content-service
app.get('/articles', (req, res) => {
    contentService.getPublishedArticles()
        .then((articles) => res.json(articles))
        .catch((err) => res.json({ message: err }));
});

// Route to fetch all categories from content-service
app.get('/categories', (req, res) => {
    contentService.getCategories()
        .then((categories) => res.json(categories))
        .catch((err) => res.json({ message: err }));
});

// Initialize the content service and start the server
contentService.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Express http server listening on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to initialize content service:', err);
    });
