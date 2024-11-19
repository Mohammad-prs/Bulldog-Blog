/*
    Full Name: Mohammadreza Parsafard
    Student Number: 121755235
    Student Email: mparsafard@myseneca.ca
    File Name: content-service.js
    Date Created: October14th , 2024
    Last Modified: October14th , 2024
*/

const fs = require('fs');
const path = require('path');

// Global arrays to store the data
let articles = [];
let categories = [];

// Function to initialize
function initialize() {
    return new Promise((resolve, reject) => {
        const articlesFilePath = path.resolve(__dirname, 'data', 'articles.json');
        const categoriesFilePath = path.resolve(__dirname, 'data', 'categories.json');

        // Read articles.json file
        fs.readFile(articlesFilePath, 'utf8', (err, data) => {
            if (err) {
                reject('Unable to read articles file');
            } else {
                articles = JSON.parse(data);

                // Read categories.json file
                fs.readFile(categoriesFilePath, 'utf8', (err, data) => {
                    if (err) {
                        reject('Unable to read categories file');
                    } else {
                        categories = JSON.parse(data);
                        resolve(); // All data has been loaded
                    }
                });
            }
        });
    });
}

// Function to get only the published articles
function getPublishedArticles() {
    return new Promise((resolve, reject) => {
        const publishedArticles = articles.filter(article => article.published === true);
        if (publishedArticles.length > 0) {
            resolve(publishedArticles);
        } else {
            reject('No published articles found');
        }
    });
}

// Function to get all categories
function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length > 0) {
            resolve(categories);
        } else {
            reject('No categories found');
        }
    });
}

// Export the functions for use in other modules
module.exports = {
    initialize,
    getPublishedArticles,
    getCategories
};


module.exports.addArticle = (articleData) => {
    return new Promise((resolve, reject) => {
        articleData.published = articleData.published === "true";
        articleData.id = articles.length + 1; // Assign a unique ID
        articles.push(articleData);
        resolve(articleData);
    });
};



module.exports.getArticlesByCategory = (category) => {
    return new Promise((resolve, reject) => {
        const filteredArticles = articles.filter(article => article.category == category);
        if (filteredArticles.length > 0) resolve(filteredArticles);
        else reject("no results returned");
    });
};

module.exports.getArticlesByMinDate = (minDateStr) => {
    return new Promise((resolve, reject) => {
        const minDate = new Date(minDateStr);
        const filteredArticles = articles.filter(article => new Date(article.articleDate) >= minDate);
        if (filteredArticles.length > 0) resolve(filteredArticles);
        else reject("no results returned");
    });
};

module.exports.getArticleById = (id) => {
    return new Promise((resolve, reject) => {
        const foundArticle = articles.find(article => article.id == id);
        if (foundArticle) resolve(foundArticle);
        else reject("no results returned");
    });
};
