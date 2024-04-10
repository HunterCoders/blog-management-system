// /blogRoutes.js

const express = require('express');
const router = express.Router();


// models/Blog.js

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

console.log('here');

router.post('/createBlogPost', async (req, res) => {
    console.log(req+"gsdg");
  try {
    const userId = req.session.id; // Retrieve user ID from session
    const { content } = req.body;
    console.log(content);
    const blogPost = new Blog({ userId, content });
    await blogPost.save();
    res.status(201).json({ message: 'Blog post created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get blog posts by user ID
router.get('/', async (req, res) => {
  try {
    const userId = req.session.id; // Retrieve user ID from session
    const blogPosts = await Blog.find({ userId });
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
