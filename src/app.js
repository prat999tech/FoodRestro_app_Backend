import cors from"cors";
import express from "express";
import cookieParser from "cookie-parser";
const app=express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credentials:true
}))
app.use(express.json({limit:"10kb"}));
app.use(express.urlencoded({limit:"10kb"}));
app.use(express.static("./public"));
app.use(cookieParser());

import userrouter from "../routes/user.route.js"
app.use("api/v1/users",userrouter)



export default app;































/*
1. npm run dev in Terminal:

Your package.json likely has a script like "dev": "nodemon -r dotenv/config index.js" or "dev": "node -r dotenv/config index.js".
The script executes index.js.
dotenv.config({ path: './env' });: The dotenv library loads your environment variables (like PORT, CORS_ORIGIN, DB_URI, SMTP_HOST, etc.) from your .env file into process.env.
connectDB().then(...): Your connectDB function (from index_db.js) initiates a connection to your MongoDB database. This is an asynchronous operation.
Server Starts Listening: Only after the database connection is successful, the .then() block executes:
app.listen(process.env.PORT || 8000, ...): Your Express application starts listening for incoming HTTP requests on the port specified in your .env file (or port 8000 if not set).
You see app is listening on port 8000 (or your configured port) in your terminal.
Server is now ready to receive requests.
2. Client Sends POST /api/v1/users/register Request:

Let's assume a client sends a POST request to http://localhost:8000/api/v1/users/register with a JSON body:

JSON

{
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "username": "johndoe",
    "password": "securepassword123"
}
And it includes an avatar file in multipart/form-data.

Here's how the app.use() middleware chain processes this request:

app.use(cors(...)):

Execution: This middleware runs first. It checks the Origin header from the client's request. If http://localhost:3000 is allowed by process.env.CORS_ORIGIN, it adds the necessary Access-Control-Allow-Origin and other CORS headers to the response.
Result: The request is allowed to proceed from a different origin.
app.use(express.json({limit:"10kb"})):

Execution: This middleware runs next. It sees the Content-Type is multipart/form-data (because you're sending a file). express.json primarily handles application/json, so it will not parse the body here.
Result: req.body remains empty at this point for the JSON part of the data.
app.use(express.urlencoded({limit:"10kb"})):

Execution: This runs next. It handles application/x-www-form-urlencoded. It will also not parse the multipart/form-data body.
Result: req.body still remains empty.
app.use(express.static("./public")):

Execution: This runs next. The incoming URL is /api/v1/users/register. This path does not directly map to a static file in your ./public directory.
Result: This middleware calls next(), passing control to the next middleware.
app.use(cookieParser()):

Execution: This runs next. It parses any cookies sent by the client in the Cookie header and populates req.cookies.
Result: req.cookies object is now available.
app.use("api/v1/users", userrouter):

Execution: The request path /api/v1/users/register matches the prefix /api/v1/users.
Result: Express passes the remaining part of the URL (/register) to the userrouter.
Inside userrouter (e.g., user.route.js):

Let's assume your user.route.js has something like:

JavaScript

// user.route.js
import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js'; // Assuming you have this

const router = Router();

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    registerUser
);

export default router;
upload.fields(...) (Multer Middleware):

Execution: This is the specific multer middleware you defined. It runs before registerUser. It processes the multipart/form-data request.
Result:
It saves the avatar and coverImage files to ./public/temp.
It populates req.files with information about the uploaded files (e.g., req.files.avatar[0].path).
It populates req.body with the fullName, email, username, and password from the form fields.
It calls next().
registerUser (Controller):

Execution: Finally, your registerUser controller function is executed.
Result:
It now has access to req.body (containing fullName, email, username, password) and req.files (containing the local paths to avatar and coverImage).
It performs validation, uploads images to Cloudinary, creates the user in the database, sends a confirmation email, and sends a 201 Created JSON response back to the client.
This entire sequence demonstrates how app.use() orchestrates the flow of a request through various processing stages before it reaches its final destination, making your application modular and robust.
















*/

