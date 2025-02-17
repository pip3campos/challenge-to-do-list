# DevUniversity Challenge: Advanced To-Do List Application

## Project Description

This project implements a full-stack To-Do List application with advanced features, designed to simulate a real-world production environment. The application allows users to create, read, update, and delete tasks, manage their tasks securely through authentication, and experience a responsive and optimized user interface. This project was built to fulfill the requirements for the DevUniversity Full-Stack Developer challenge (Enero-Feb 2025).

## Technologies Used

*   **Frontend:**
    *   React.js
    *   Next.js 13
    *   TypeScript
    *   Modular SCSS
    *   `next/image`
*   **Backend:**
    *   Node.js
    *   Express
    *   TypeScript
    *   Mongoose
    *   JSON Web Tokens (JWT)
    *   Swagger
    *   Jest
    *   Supertest
*   **Database:**
    *   MongoDB
*   **Deployment:**
    *   Vercel

## Features

*   **Task Management:** Create, read, update, and delete tasks.
*   **User Authentication:** Secure user authentication using JWT.
*   **User-Specific Tasks:** Each user can only view and manage their own tasks.
*   **Responsive Design:** The application is designed to be responsive and accessible on various devices.
*   **RESTful API:** A well-documented RESTful API implemented with Node.js and Express.
*   **API Documentation:** Comprehensive API documentation generated with Swagger.
*   **Automated Testing:** Includes unit and integration tests using Jest and Supertest.

## Instructions

### 1. Installation

1.  **Clone the repository:**

    ```
    git clone https://github.com/pip3campos/challenge-to-do-list
    cd challenge-to-do-list
    ```

2.  **Install backend dependencies:**

    ```
    cd SERVER
    npm install
    ```

3.  **Install frontend dependencies:**

    ```
    cd ../front-end
    npm install
    ```

### 2. Configuration

#### Environment Variables

You need to configure the following environment variables for both the backend and frontend. Create `.env` files in both the `SERVER` and `front-end` directories.

**Backend (`SERVER/.env`):**

* NODE_ENV=development # "development" or "production" - Affects logging and other environment-specific behaviors. Defaults to "development" if not set.
* APP_ORIGIN=http://localhost:3000 # The origin of your frontend application. Used for CORS configuration. In production, this should be your frontend's Vercel URL.
* MONGO_URI=[YOUR_MONGODB_CONNECTION_STRING] # The URI for your MongoDB database. Example: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
* PORT=8080 # The port the server will listen on. Defaults to 8080 if not set.
* JWT_SECRET=[YOUR_JWT_SECRET_KEY] # A secret key for signing JWT tokens. Must be a strong, random string (at least 32 characters). Keep this VERY secure! Example: openssl rand -base64 32
* JWT_REFRESH_SECRET=[YOUR_JWT_REFRESH_SECRET] # A secret key for REFRESHING JWT tokens. Must be a strong, random string (at least 32 characters). Keep this VERY secure! This can be the same as JWT_SECRET, but using a different key is more secure. Example: openssl rand -base64 32

**Frontend (`front-end/.env`):**

* URL_BASE=[YOUR_BACKEND_DEPLOYMENT_URL]/api # URL of the backend API. Include /api at the end. This should be your backend's Vercel URL in production.

### 3. Running the Project Locally

#### Backend

1.  **Navigate to the backend directory:**

    ```
    cd SERVER
    ```

2.  **Start the backend server:**

    ```
    npm run dev  # For development mode (using ts-node)
    # OR
    npm start      # For production mode (after building with `npm run build`)
    ```

    The backend server should now be running on `http://localhost:8080` (or the port you specified in your `.env` file).

#### Frontend

1.  **Navigate to the frontend directory:**

    ```
    cd front-end
    ```

2.  **Start the frontend development server:**

    ```
    npm run dev
    ```

    The frontend application should now be running on `http://localhost:3000` (Next.js default, or whatever port is shown in the console).

    *NOTE: Next.js applications typically run on port 3000 by default. If you have your backend running on port 3000, you may need to configure your frontend to run on a different port by modifying the `start` script in the `front-end/package.json` file.*

### 4. API Documentation

The backend API is documented using Swagger. Once the backend server is running, you can access the Swagger UI at:

http://localhost:8080/api-docs

This provides an interactive interface to explore the API endpoints, view request/response examples, and even make requests directly from your browser.

*Note: Replace localhost:8080 with the URL or IP address of your server*

### 5. Testing

#### Backend Tests

1.  **Navigate to the backend directory:**

    ```
    cd SERVER
    ```

2.  **Run the tests:**

    ```
    npm test
    ```

    This will execute the unit and integration tests using Jest and Supertest.  Ensure that all tests pass successfully.

#### Frontend Tests

To run the frontend tests:

1.  **Navigate to the frontend directory:**

    ```
    cd frontend
    ```

2.  **Run the tests:**

    ```
    npm test
    ```

### 6. Deployment

This application is designed to be deployed on Vercel.

1.  **Create a Vercel account** (if you don't have one already) and install the Vercel CLI:

    ```
    npm install -g vercel
    ```

2.  **Deploy the backend:**
    * Make sure you have configured all of the necessary back-end environment variables in your Vercel project settings
    * Navigate to your local backend directory in your terminal and run Vercel.

3.  **Deploy the frontend:**
    * Make sure you have configured all of the necessary front-end environment variables in your Vercel project settings
    * Update the NEXT_PUBLIC_API_BASE_URL in your .env.local file to the back-end deployment url.
    * Navigate to your local front-end directory in your terminal and run Vercel.

* Vercel automatically detects that this is a Next.js project, so it should configure it for you!

#### Vercel Deployment Link

*   **Frontend Deployment:** https://challenge-to-do-list-phln.vercel.app/


### 7. API Endpoints

The API endpoints conform to RESTful principles:

*   `POST /api/auth/signup`: Create a new user.
*   `PATCH /api/auth/signin`: Log in an existing user.
*   `PATCH /api/auth/signout`: Log out a user (invalidate token).
*   `GET /api/tasks/:authorId`: Retrieve tasks for a specific user.
*   `POST /api/tasks`: Create a new task.
*   `PATCH /api/tasks/:noteId`: Update an existing task.
*   `DELETE /api/tasks/:noteId`: Delete a task.

See the Swagger documentation for detailed information about request/response formats at:

*   **API Documentation:** https://challenge-to-do-list-p76m.vercel.app/api-docs
