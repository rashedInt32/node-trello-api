import express from 'express';

import Post from '../../models/postSchema';

const router = express.Router();

/**
 * /api/posts/
 * get all posts
 * @api public
 */
router.get("/", async (req, res) => {
  const posts = await Post.find()
    .populate('author', 'name email');

  res.status(200).send(posts);
});

router.post('/add-post', async (req, res) => {
  const { title, content, author } = req.body;

  const newPost = new Post({ title, content, author });
  await newPost.save();

  res.status(200).send(newPost);
});

export default router;
