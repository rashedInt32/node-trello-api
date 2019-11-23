import express from 'express';
import multer from 'multer';
import auth from "../../middleware/authMiddleware";

const router = express.Router();

const upload = multer({ dest: './uploads/' });

// Upload route
router.post('/profile', auth, upload.single('avatar'), async (req, res) => {
  console.log('call')
  console.log(req.body);
})

export default router;
