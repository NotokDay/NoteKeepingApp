# Note-Keeping Web Application

This project is a note-keeping web application that allows users to register, login, and perform CRUD operations on their notes. It includes an admin panel for user management, authentication, and note manipulation.

## Features

- User Authentication (Register/Login)
- Admin Dashboard for user management
- Note CRUD operations:
  - Create Notes
  - View Notes
  - Edit Notes
  - Delete Notes

## Project Structure

- `controllers/`: Contains controller files for routing logic.
  - `admin.js`: Handles admin-related operations.
  - `auth.js`: Handles authentication-related functionality.
  - `notes.js`: Contains logic for note CRUD operations.
- `db/`: Database-related files.
  - `connect.js`: Database connection configuration.
- `middleware/`: Middleware for application.
  - `authChecker.js`: Middleware to check authentication tokens.
- `routes/`: Router files that define route endpoints.
  - `admin.route.js`: Routes for admin functions.
  - `auth.route.js`: Routes for authentication.
  - `index.route.js`: Primary routes for the application.
- `views/`: EJS templates for rendering HTML.
  - `admin.ejs`: Admin panel view.
  - `dashboard.ejs`: Main dashboard for users.
  - `note.ejs`: Individual note view.
  - `editNote.ejs`: Note editing view.
  - `createNote.ejs`: Form for creating a new note.
  - `login.ejs`, `register.ejs`: Authentication views.
  - `forbidden.ejs`: Access denied view.
- `.env`: Environment variables for configuration (not included in repository for security reasons).
- `app.js`: Main application file.
- `init_db.sql`: SQL script to initialize the database.

## Setup

1. Make sure mysql is running on localhost
2. Change .env file accordingly
3. Connect to the database and run init_db.sql file. 
4. Install dependencies
```
npm install
```
5. Run the application
```
node app.js 
//or
nodemon app.js
```

## Other

The init_db script generates default admin user with `admin123` password. You can access admin panel under /admin and change the default password. 
