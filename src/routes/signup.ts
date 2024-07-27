import { Router, Request, Response } from 'express';
import User from '../models/User';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import transporter from '../config/nodemailer';

const router = Router();

// Function to generate a 6-digit numerical OTP
const generateNumericOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

router.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!validator.isLength(password, { min: 6 })) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Generate a 6-digit numerical OTP
    const otp = generateNumericOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    await newUser.save();

    // Send OTP to email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    };
console.log("mailotion ", mailOptions)
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        return res.status(500).json({ error: 'Error sending OTP email' });
      } else {
        console.log('Email sent:', info.response);
        return res.status(201).json({ message: 'User created successfully. OTP sent to email.' });
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
