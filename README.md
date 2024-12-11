Web322 Assignment
Student Name: Mohammadreza Parsafard
Student Number: 121755235
Student Email: mparsafard@myseneca.ca
Date Created: September 23th , 2024
Last Modified: December 11th , 2024

GITHUB URL: https://github.com/Mohammad-prs/Web322_Assignment_1
VERCEL URL: https://web322-assignment-1-mfc3-git-master-mohammad-prs-projects.vercel.app/about

Technology Stack
Frontend: HTML, CSS (Bootstrap 5), JavaScript, jQuery
Backend: Node.js, Express.js
Database: PostgreSQL (hosted on Neon.tech)

Notes
By submitting this as my assignment, I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this assignment has been copied manually or electronically from any other source (including web sites) or distributed to other students.

How to Use the Application
Clone the repository and navigate to the project directory using bash:
git clone https://github.com/Mohammad-prs/Web322_Assignment_1
cd your repository name
Install dependencies:
npm install
Configure the database credentials:

Create a .env file in the root directory.

Add the following variables with your Neon.tech database credentials:

DB_USER=neondb_owner
DB_HOST=ep-small-block-a5r0iz7y.us-east-2.aws.neon.tech
DB_NAME=neondb
DB_PASSWORD=mOBUMZe54uIS
DB_PORT=5432
Run the application:

node server.js
Access the application at the following routes:

Home (Redirects to About): http://localhost:3243/
About Page: http://localhost:3243/about
Articles List: http://localhost:3243/articles
Categories List: http://localhost:3243/categories
Add Article: http://localhost:3243/articles/add
View Article: http://localhost:3243/article/:id (replace :id with a valid article ID)
Edit Article: http://localhost:3243/articles/edit/:id (replace :id with a valid article ID)
Neon.tech Integration
The application is now integrated with a cloud-hosted PostgreSQL database on Neon.tech. This allows scalable and reliable database interactions, replacing the previous JSON-based storage system.

Database Connection Details:
The following credentials were used for the database configuration:

Connection String: postgresql://neondb_owner:mOBUMZe54uIS@ep-small-block-a5r0iz7y.us-east-2.aws.neon.tech/neondb?sslmode=require  
User: neondb_owner  
Host: ep-small-block-a5r0iz7y.us-east-2.aws.neon.tech  
Database Name: neondb  
Password: mOBUMZe54uIS  
Port: 5432  
Database Configuration:
The database is configured using the pg library. A connection pool is established using the credentials provided in the .env file for secure database access. SSL is enabled for secure communication.

Features and Updates
This assignment refactored the application to use a PostgreSQL database hosted on Neon.tech. Articles and categories are now stored in the database, enabling robust data management and scalability. Existing routes were updated to fetch data dynamically using SQL queries, and new routes were added for updating and deleting articles. The following key features were implemented:

Database Integration: Articles and categories are now stored in a PostgreSQL database. JSON-based functions were refactored to SQL-based queries.
Dynamic Pages: EJS templates dynamically render articles and categories with data from the database.
Edit and Delete: Users can edit or delete articles directly from the UI. Changes are persisted to the database.
Error Handling: User-friendly error messages are displayed for invalid requests or database errors.
Responsive Design: The application uses Bootstrap for styling, ensuring a responsive and user-friendly interface.