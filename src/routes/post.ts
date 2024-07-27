import { Router } from 'express';

const router = Router();

router.post('/post', (req, res) => {
  const { title, subtitle } = req.body;

  if (!title || !subtitle) {
    return res.status(400).json({ error: 'Title and subtitle are required' });
  }

  // Here you can handle the title and subtitle, e.g., save them to a database
  console.log(`Received title: ${title}, subtitle: ${subtitle}`);

  res.status(200).json({ message: 'Title and subtitle received', data: { title, subtitle } });
});

export default router;
