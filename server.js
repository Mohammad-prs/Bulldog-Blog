/*
    Full Name: Mohammadreza Parsafard
    Student Number: 121755235
    Student Email: mparsafard@myseneca.ca
    File Name: server.js
    Date Created: September 23th , 2024
    Last Modified: October14th , 2024
*/


const express = require('express');
const path = require('path');
const contentService = require('./content-service');  // Import the content service

const app = express();
const port = process.env.PORT || 3243;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Redirect root route ('/') to '/about'
app.get('/', (req, res) => {
    res.redirect('/about');
});

// Serve about.html when '/about' is accessed
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Serve addArticle.html when '/articles/add' is accessed
app.get('/articles/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'addArticle.html'));
});


// Route to fetch published articles from content-service
app.get('/articles', (req, res) => {
    if (req.query.category) {
        contentService.getArticlesByCategory(req.query.category)
            .then(articles => res.json(articles))
            .catch(err => res.status(500).json({ message: err }));
    } else if (req.query.minDate) {
        contentService.getArticlesByMinDate(req.query.minDate)
            .then(articles => res.json(articles))
            .catch(err => res.status(500).json({ message: err }));
    } else {
        contentService.getPublishedArticles()
            .then(articles => res.json(articles))
            .catch(err => res.status(500).json({ message: err }));
    }
});

app.get('/article/:id', (req, res) => {
    contentService.getArticleById(req.params.id)
        .then(article => res.json(article))
        .catch(err => res.status(500).json({ message: err }));
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



    
    
    const multer = require("multer");
    const cloudinary = require('cloudinary').v2;
    const streamifier = require('streamifier');
    
    cloudinary.config({
        cloud_name: 'dgrxqragr',
        api_key: '876523627773131',
        api_secret: 'Jr8Sh8TGEWms2cJA87tpgQD5T1o',
        secure: true
    });
    
    const upload = multer(); // No disk storage, files are stored in memory
    


    // Route to handle form submission for adding a new article
app.post('/articles/add', upload.single("featureImage"), (req, res) => {
    // Check if a file (image) was uploaded
    if (req.file) {
        // Function to upload the file to Cloudinary using a stream
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                // Create an upload stream to Cloudinary
                let stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) resolve(result); // Resolve the promise if upload is successful
                    else reject(error);         // Reject the promise if there's an error
                });

                // Stream the file buffer to Cloudinary
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        // Asynchronous function to upload the file and return the result
        async function upload(req) {
            let result = await streamUpload(req);
            return result;
        }

        // Upload the file and handle the result
        upload(req).then((uploaded) => {
            // Process the article with the uploaded image URL
            processArticle(uploaded.url);
        }).catch(err => {
            // Handle errors during the file upload
            res.status(500).json({ message: "Image upload failed", error: err });
        });
    } else {
        // If no file was uploaded, proceed without an image URL
        processArticle("");
    }

    // Function to process the article and save it
    function processArticle(imageUrl) {
        // Add the image URL to the request body
        req.body.featureImage = imageUrl;

        // Add the new article to the content-service
        contentService.addArticle(req.body)
            .then(() => {
                // Redirect to the /articles route after successful addition
                res.redirect('/articles');
            })
            .catch(err => {
                // Handle errors during article creation
                res.status(500).json({ message: "Article creation failed", error: err });
            });
    }
});
