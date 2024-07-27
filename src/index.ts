import express from 'express';
import bodyParser from 'body-parser';
import postRoutes from '../src/routes/post';
import connectDB from './config/database';
import dotenv from 'dotenv';
import signupRoutes from "../src/routes/signup"
import signinRoutes from "../src/routes/signin"
import verifyOtpRoutes from "../src/routes/verifyotp"
// Load environment variables
dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/post', postRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/signin', signinRoutes);
app.use('/api/verify-otp', verifyOtpRoutes);
// Connect to MongoDB
connectDB();

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
