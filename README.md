# Web322 Assignment

Student Name:  Mohammadreza Parsafard
Student Number:  121755235
Student Email:  mparsafard@myseneca.ca
Date Created:  September 23th , 2024
Last Modified: November 18th , 2024

GITHUB URL:  https://github.com/Mohammad-prs
VERCEL URL:  https://web322-assignment-1-mfc3-git-master-mohammad-prs-projects.vercel.app/

### Technology Stack

**Frontend**:  HTML, CSS (Bootstrap 5), JavaScript, jQuery
**Backend**: Node.js, Express.js  
**Database**:  Static JSON files (articles.json, categories.json)  

### Notes

By submitting this as my assignment, I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this assignment has been copied manually or electronically from any other source (including web sites) or distributed to other students.


### how to use application

1. Clone the repository and navigate to the project directory using bash:

git clone https://github.com/Mohammad-prs/Web322_Assignment_1
cd your repository name

2. npm install

3. Run the application:

4. Access the following routes in your browser:

Home (Redirects to About): http://localhost:3243/
About Page: http://localhost:3243/about
Articles (JSON): http://localhost:3243/articles
Categories (JSON): http://localhost:3243/categories


### Features and Updates

This assignment enhances the previous functionality by introducing dynamic templating with EJS for rendering web pages. Static HTML pages such as about.html and addArticle.html were refactored into .ejs templates to dynamically render content. The articles.ejs page displays a list of articles in a styled table, with links for filtering by category and viewing individual article details. Similarly, the categories.ejs page dynamically displays all categories from categories.json, with each category linking to its corresponding filtered articles. A new route /article/:id and article.ejs page were added to display individual article details, including the title, content, category, and feature image (if available). Unpublished or invalid articles are handled with user-friendly error messages. The addArticle.ejs form was updated to dynamically populate the category dropdown with data from categories.json and now supports image uploads to Cloudinary. These improvements ensure a better user experience with dynamic data rendering and robust error handling.