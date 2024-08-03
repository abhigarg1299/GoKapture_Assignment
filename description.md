Environment Configuration
.env File
The .env file is used to store environment variables that configure the application's behavior. In this case, it contains:

MONGODB_URL: The URL for connecting to the MongoDB database.
JWT_SECRET: A secret key for signing JSON Web Tokens (JWTs), used for user authentication.

app.js

This is the main entry point of the application. It sets up the Express server and connects to the MongoDB database.

Imports and Setup:

dotenv is used to load environment variables from the .env file.
express is the web framework.
mongoose connects to the MongoDB database.
userRoutes and taskRoutes import the route handlers for user and task-related endpoints.
Middleware:

express.json() is used to parse incoming JSON requests.
Routes:

/api is the base route prefix for all API endpoints.

Database Connection:

Connects to MongoDB using the provided URI and handles connection errors.

User Model and Authentication
models/user.js

Defines the User model schema using Mongoose.

Fields:

username: Unique identifier for the user.
password: The user's password, which is hashed before storing.
role: Defines the user's role (either User or Admin), defaulting to User.
Pre-save Hook:

userSchema.pre('save', ...): Hashes the user's password before saving it to the database.
Instance Methods:

comparePassword: Compares a plaintext password with the hashed password stored in the database.
controllers/userController.js

Handles user-related actions such as registration and login.

register:

Creates a new user with the provided username, password, and role.
Hashes the password and stores the user in the database.
login:

Authenticates the user by checking the username and comparing the password.
If valid, generates a JWT with the user's ID and role.
routes/userRoutes.js

Defines the user-related routes.

POST /api/register: Registers a new user.
POST /api/login: Logs in a user and returns a JWT.

Task Model and CRUD Operations
models/task.js

Defines the Task model schema using Mongoose.

Fields:
title: Title of the task.
description: Detailed description of the task.
status: The current status of the task (e.g., Todo, In Progress, Done).
priority: Priority level of the task (e.g., Low, Medium, High).
due_date: Due date for the task.
user_id: The ID of the user the task is assigned to.
controllers/taskController.js

Handles task-related actions like creating, retrieving, updating, and deleting tasks.

createTask: Creates a new task associated with the logged-in user.
getTasks: Retrieves tasks with options for filtering by status and priority, searching by title or description, and pagination.
updateTask: Updates a specific task belonging to the logged-in user.
deleteTask: Deletes a specific task belonging to the logged-in user.
routes/taskRoutes.js

Defines the task-related routes and applies authentication middleware.

POST /api/tasks: Creates a new task.
GET /api/tasks: Retrieves tasks with optional filtering, searching, and pagination.
PUT /api/tasks/:taskId: Updates a specific task.
DELETE /api/tasks/:taskId: Deletes a specific task.

Authentication Middleware
middlewares/authMiddleware.js

Middleware functions for handling authentication and authorization.

authMiddleware:

Verifies the JWT from the request header and sets req.user to the authenticated user.
Rejects requests if the user is not authenticated.
adminMiddleware:

Checks if the authenticated user has an Admin role.
Denies access if the user does not have the required permissions.

POST /api/register:

Tests user registration functionality, ensuring that new users can register successfully.
POST /api/login:

Tests user login functionality, verifying that users can log in and receive a JWT.
