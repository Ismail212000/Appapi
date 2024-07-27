import express from 'express';
import bodyParser from 'body-parser';
import postRoutes from './routes/post'; // This is if `index.ts` and `routes` are in the same directory
import connectDB from './config/database';
import dotenv from 'dotenv';
import signupRoutes from "./routes/signup"
import signinRoutes from "./routes/signin"
import verifyOtpRoutes from "./routes/verifyotp"
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
