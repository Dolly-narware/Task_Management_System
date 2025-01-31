# Task Management System

A full-stack web application for managing personal tasks, built with a **Flask REST API** backend and **React** frontend. Features JWT authentication, CRUD operations, and user-specific task isolation.

![Demo](https://via.placeholder.com/800x400.png?text=Task+Management+Demo) *Replace with actual screenshot*

## Features

### Backend (Flask API)
- 🔒 **JWT Authentication**: Secure user registration/login with JSON Web Tokens
- 📝 **Task CRUD Operations**: 
  - Create, read, update, and delete tasks
  - Task attributes: Title, description, status (pending/completed), timestamp
- 🛡️ **Protected Routes**: All task endpoints require valid JWT tokens
- 📊 **SQLite Database**: Persistent data storage with SQLAlchemy ORM
- 📋 **Error Handling**: Consistent error responses with HTTP status codes
- 📜 **Logging**: Detailed request/error logging

### Frontend (React)
- 👤 **User Authentication**: Clean login/registration forms
- 📋 **Task Dashboard**: 
  - View tasks in list format
  - Create new tasks with title/description
  - Edit existing tasks or mark as complete
  - Delete tasks
- 🔄 **Real-time Updates**: Instant UI feedback after API operations
- 🛡️ **Protected Routes**: Client-side route protection using React Router
- 📱 **Responsive Design**: Works on mobile and desktop devices

## Technologies Used

**Backend**:
- Python 3
- Flask
- Flask-SQLAlchemy
- Flask-JWT-Extended
- SQLite

**Frontend**:
- React 18
- React Router 6
- Axios
- HTML5/CSS3

## Setup Instructions

### Prerequisites
- Python 3.9+
- Node.js 16+
- npm 8+

 
### create folder
-create task management system folder
-create frontend and backend folder


### frontend setup 
-npx create -react-app .
-create component folder into src folder
-create login and signup page
-run npm start


### Backend setup
-install python 
-install pip
-create virtual environment
-activate virtual environment
-install flask
- run server by python app.py
- create model and create login signup with help of jwt
- install SQLAlchemy
- install Resource ,Api
- install  request,jsonify
- install jwt_required,JWTManager
- get_jwt_identity
- check all the requests through postman

  ##creating SQLite
  store user details like name emaild and password


   ## connectivity of frontend and backend
  -install Cors
  -install axios

  ##creating todo in backend first
 - create task model
 - perform CRUD operation through protected route and check through postman

   ## creating in frontend
   -create dashboard
   -create to do form for taking input
   -fetch ,create,update,delete
   -display todo
   and connecting with backend


   
  
  
  


