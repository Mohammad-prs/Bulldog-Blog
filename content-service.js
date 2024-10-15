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
        
        fs.readFile(path.join(__dirname, 'data', 'articles.json'), 'utf8', (err, data) => {
            if (err) {
                reject('Unable to read articles file');
            } else {
                articles = JSON.parse(data);
                
                
                fs.readFile(path.join(__dirname, 'data', 'categories.json'), 'utf8', (err, data) => {
                    if (err) {
                        reject('Unable to read categories file');
                    } else {
                        categories = JSON.parse(data);
                        resolve();
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

