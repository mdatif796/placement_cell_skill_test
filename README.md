# Coding Ninjas Placement Cell

An interface for coding ninjas placement cell to keep records of students and schedule interviews with different companies

## Features

- Sign up / Sign in forms for employees
- Add a new student to the list of students
- Allocate and schedule interview with different companies and update their result status
- Download reports of students in csv format

## Tech Stack

- [Node.js](https://nodejs.org/en/): An asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.

- [Express](https://expressjs.com/): Express is a minimal and flexible Node.js web application framework

- [EJS](https://ejs.co/): View Engine used to display web pages

- [mongoDB](https://www.mongodb.com/): A NoSQL database which uses JSON-like documents

- [Passport](http://www.passportjs.org/): Passport is authentication middleware for Node.js

## Setup

Run `npm install` to install required dependencies
Create .env file in root directory
Environment Variables:

- SECRET=[Your secret]
- DATABASE_PASS=[Your db pass]
- MONGO_USER=[Your db user name]
- MONGO_DATABASE=[Your db name]
