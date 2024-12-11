/*
    Full Name: Mohammadreza Parsafard
    Student Number: 121755235
    Student Email: mparsafard@myseneca.ca
    File Name: server.js
    Date Created: September 23th, 2024
    Last Modified: December 12th, 2024
*/



const express = require('express');
const path = require('path');
const contentService = require('./content-service'); // Import the content service
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const app = express();
const port = process.env.PORT || 3243;

app.set('view engine', 'ejs'); // Specify EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Define the views directory
const methodOverride = require('method-override');
app.use(methodOverride('_method')); // Enables overriding methods



// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON body for PUT/POST requests
app.use(express.json());

// Cloudinary configuration for image uploads
cloudinary.config({
    cloud_name: 'dgrxqragr',
    api_key: '876523627773131',
    api_secret: 'Jr8Sh8TGEWms2cJA87tpgQD5T1o',
    secure: true
});

const upload = multer(); // No disk storage, files are stored in memory

// Redirect root route ('/') to '/about'
app.get('/', (req, res) => {
    res.redirect('/about');
});

// About page
app.get('/about', (req, res) => {
    res.render('about');
});

// Add Article page
app.get('/articles/add', (req, res) => {
    contentService.getCategories()
        .then(categories => {
            res.render('addArticle', { categories });
        })
        .catch(err => {
            res.render('addArticle', { categories: [] }); // Handle error by rendering an empty list
        });
});

// Add Article POST route
app.post('/articles/add', upload.single('featureImage'), (req, res) => {
    const processArticle = (imageUrl) => {
        req.body.featureImage = imageUrl;
        contentService.addArticle(req.body)
            .then(() => res.redirect('/articles'))
            .catch(err => res.status(500).json({ message: 'Article creation failed', error: err }));
    };

    if (req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) resolve(result);
                    else reject(error);
                });
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function upload(req) {
            let result = await streamUpload(req);
            return result;
        }

        upload(req)
            .then(uploaded => processArticle(uploaded.url))
            .catch(err => res.status(500).json({ message: 'Image upload failed', error: err }));
    } else {
        processArticle('');
    }
});

// Fetch all articles
app.get('/articles', (req, res) => {
    const { category, minDate } = req.query;

    if (category) {
        contentService.getArticlesByCategory(category)
            .then(articles => res.render('articles', { articles }))
            .catch(err => res.render('articles', { articles: [] }));
    } else if (minDate) {
        contentService.getArticlesByMinDate(minDate)
            .then(articles => res.render('articles', { articles }))
            .catch(err => res.render('articles', { articles: [] }));
    } else {
        contentService.getAllArticles()
            .then(articles => res.render('articles', { articles }))
            .catch(err => res.render('articles', { articles: [] }));
    }
});

// Fetch an article by ID
app.get('/article/:id', (req, res) => {
    contentService.getArticleById(req.params.id)
        .then(article => {
            if (!article.published) {
                res.status(404).render('articles', {
                    articles: [],
                    message: 'The requested article is not available because it is unpublished.'
                });
            } else {
                res.render('article', { article });
            }
        })
        .catch(err => res.status(404).render('articles', {
            articles: [],
            message: 'The requested article could not be found.'
        }));
});

// Fetch all categories
app.get('/categories', (req, res) => {
    contentService.getCategories()
        .then(categories => {
            res.render('categories', { categories });
        })
        .catch(err => {
            res.render('categories', { categories: [] }); // Render empty if error
        });
});

// Route to update an article
app.put('/articles/:id', (req, res) => {
    contentService.updateArticle(req.params.id, req.body)
        .then(() => {
            res.redirect('/articles'); // Redirect to the articles page after update
        })
        .catch(err => {
            res.status(500).send('Error updating article');
        });
});

// Route to delete an article
app.delete('/articles/:id', (req, res) => {
    contentService.deleteArticle(req.params.id)
        .then(() => {
            res.redirect('/articles'); // Redirect to the articles page after deletion
        })
        .catch(err => {
            res.status(500).send('Error deleting article');
        });
});




app.get('/articles/edit/:id', (req, res) => {
    Promise.all([
        contentService.getArticleById(req.params.id),
        contentService.getCategories()
    ])
    .then(([article, categories]) => {
        res.render('editArticle', { article, categories });
    })
    .catch(err => {
        res.status(404).send('Article not found.');
    });
});

// Route to display the Edit Article page
app.get('/articles/edit/:id', (req, res) => {
    Promise.all([
        contentService.getArticleById(req.params.id),
        contentService.getCategories()
    ])
    .then(([article, categories]) => {
        res.render('editArticle', { article, categories });
    })
    .catch(err => {
        res.status(500).send('Error loading edit page');
    });
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
