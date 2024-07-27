import { Router, Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a success response
    res.status(200).json({ message: 'Signin successful' });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
