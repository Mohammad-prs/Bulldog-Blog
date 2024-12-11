/*
    Full Name: Mohammadreza Parsafard
    Student Number: 121755235
    Student Email: mparsafard@myseneca.ca
    File Name: content-service.js
    Date Created: October 14th, 2024
    Last Modified: December 11th, 2024
*/

const { Pool } = require('pg');

// PostgreSQL connection pool
const pool = new Pool({
    user: 'neondb_owner',
    host: 'ep-bold-bird-a5a8yqsk.us-east-2.aws.neon.tech',
    database: 'neondb',
    password: 'spkQ7JImKiO0',
    port: 5432,
    ssl: { rejectUnauthorized: false }, 
});

// Function to initialize the connection (optional for testing)
function initialize() {
    return Promise.resolve('Database connected successfully');
}

// Function to get all articles
function getAllArticles () {
    return pool.query('SELECT * FROM articles')
        .then(res => {
            return res.rows.map(article => {
                if (article.articledate) {
                    // Format the date to YYYY-MM-DD
                    article.articleDate = new Date(article.articledate).toISOString().split('T')[0];
                } else {
                    article.articleDate = null;
                }
                return article;
            });
        })
        .catch(err => Promise.reject('No articles found'));
};






// Function to get only published articles
function getPublishedArticles() {
    return pool.query('SELECT * FROM articles WHERE published = true')
        .then(res => res.rows)
        .catch(err => Promise.reject('No published articles found'));
}

// Function to get articles by category
function getArticlesByCategory(category) {
    return pool.query('SELECT * FROM articles WHERE category = $1', [category])
        .then(res => res.rows)
        .catch(err => Promise.reject('No results returned'));
}

// Function to get articles by minimum date
function getArticlesByMinDate(minDateStr) {
    return pool.query('SELECT * FROM articles WHERE articleDate >= $1', [minDateStr])
        .then(res => res.rows)
        .catch(err => Promise.reject('No results returned'));
}

// Function to get an article by ID
function getArticleById(id) {
    return pool.query('SELECT * FROM articles WHERE id = $1', [id])
        .then(res => {
            if (res.rows.length > 0) {
                return res.rows[0];
            } else {
                throw new Error('No results returned');
            }
        })
        .catch(err => Promise.reject(err.message));
}

// Function to get all categories
function getCategories() {
    return pool.query('SELECT * FROM categories')
        .then(res => res.rows)
        .catch(err => Promise.reject('No categories found'));
}

// Function to add a new article
function addArticle(articleData) {
    return pool.query(
        'INSERT INTO articles (title, content, published, category, articleDate, featureImage) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [
            articleData.title,
            articleData.content,
            articleData.published === 'true',
            articleData.category,
            articleData.articleDate,
            articleData.featureImage || null
        ]
    )
        .then(res => res.rows[0])
        .catch(err => Promise.reject('Unable to add article'));
}


function updateArticle (id, articleData) {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE articles
            SET title = $1, content = $2, published = $3, category = $4, articledate = $5
            WHERE id = $6
        `;
        const values = [
            articleData.title,
            articleData.content,
            articleData.published === 'true',
            articleData.category,
            articleData.articleDate || new Date(),
            id
        ];

        pool.query(query, values)
            .then(() => resolve())
            .catch(err => reject('Error updating article'));
    });
};


function deleteArticle (id) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM articles WHERE id = $1`;
        const values = [id];

        pool.query(query, values)
            .then(() => resolve())
            .catch(err => reject('Error deleting article'));
    });
};




// Export the functions
module.exports = {
    initialize,
    getAllArticles,
    getPublishedArticles,
    getArticlesByCategory,
    getArticlesByMinDate,
    getArticleById,
    getCategories,
    addArticle,
    deleteArticle,
    updateArticle
};
