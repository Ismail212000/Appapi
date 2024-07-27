import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  // Validate email and OTP
  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if OTP is valid and has not expired
    if (user.otp === null || user.otpExpires === null || user.otpExpires === undefined || user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // OTP is valid, proceed with user verification
    user.otp = null; // Clear OTP
    user.otpExpires = null; // Clear OTP expiration date
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
