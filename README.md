# My Assignment

## Getting Started

This repository includes the assignment of a simple API using Nodejs, Express.js and Sequelize ORM with PostgreSQL as the database.

## File structure


#### `DPDZERO-TASK` - Holds the server application

- #### `src` 
    - #### `controller` - This hold all of the callback functions that each route will call
    - #### `middleware` - This directory holds all middleware functions
    - #### `model` - This holds code for creating tables (User, Data) 
    - #### `route` - This folder contains all of our HTTP to URL routes for each URL
- #### `index.js` - This file is typically the entry point to the application
- #### `package.json` - It lists all dependencies that your project needs to run, with their corresponding versions.
- #### `.gitignore` - Tells git which files to ignore
- #### `README` - This file!


## Table of Contents

1. [Framework Used](#framework-used)
2. [Database Schema](#database-schema)
3. [Instructions to Setup the Code](#instructions-to-setup-the-code)
4. [Instructions to Run the Code](#instructions-to-run-the-code)

## Framework Used

This application is built with the following frameworks:

- Node.js as the runtime environment.
- Express.js as the web application framework.
- Sequelize as the Object-Relational Mapping (ORM).
- PostgreSQL as the database.

## Database Schema

The database consists of two tables, `User` and `Data`. 

`User` has the following fields:
- `id`: Primary key, autoincrement.
- `username`:  and required.
- `email`: Unique, required, and must be a valid email.
- `passUniqueword`: Required and must meet certain strength requirements.
- `full_name`: Required.
- `age`: Required and must be a positive integer.
- `gender`: Required and must be either 'male', 'female', or 'non-binary'.

`Data` has the following fields:
- `id`: Primary key, autoincrement.
- `key`: Unique and required.
- `value`: Required.
- `userId`: Foreign key, referencing `id` in the `User` table.

## Instructions to Setup the Code

Before running the code, you need to setup the environment and the database:

1. Clone the repository: `git clone https://github.com/username/repo.git`
2. Navigate to the directory: `cd repo`
3. Install the dependencies: `npm install`
4. Copy the `.env.example` to `.env`: `cp .env.example .env`
5. Fill in your database credentials and the JWT Secret Key in the `.env` file.


## Instructions to Run the Code

Once the setup is completed, you can run the server:

1. Start the server: `npm start`
2. The server should now be running at `http://localhost:3000`
3. Use Postman or a similar tool to test the API endpoints.

*Note: Make sure PostgreSQL is running before starting the server.*

## API Endpoints

Below are the main API endpoints exposed by this application:

### User Routes: `/api`

| Endpoint       | HTTP Method | Description                  |
|----------------|-------------|------------------------------|
| `/register`    | POST        | Create a new user            |
| `/token`       | POST        | Generate authentication token|


### Data Routes: `/api/data`

| Endpoint       | HTTP Method | Description                  |
|----------------|-------------|------------------------------|
| `/`            | POST        | Create a new data            |
| `/:key`        | GET         | Fetch a data by Key          |
| `/:key`        | PUT         | Update a data by Key         |
| `/:key`        | DELETE      | Delete a data by Key         |
