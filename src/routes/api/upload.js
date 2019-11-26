import express from 'express';
import auth from "../../middleware/authMiddleware";

const router = express.Router();


// Upload route
router.post('/profile', auth, async (req, res) => {
  const file = await req.file;
  res.send(file);
})

export default router;
