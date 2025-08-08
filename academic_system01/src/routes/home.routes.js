import express from 'express';

const router = express.Router();
import path from 'path';

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/home.html'));
});

export default router;
