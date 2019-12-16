const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blogController');
const ArticleController = require('../controllers/articleController');
const CommentController = require('../controllers/commentController');

/* Blog */
router.get('/', BlogController.readAll);
router.get('/blogId', BlogController.readblogId);
router.get('/host', BlogController.readHost);
router.post('/',BlogController.create);
router.put('/',BlogController.update);
router.delete('/',BlogController.delete);

/* Article */
router.get('/articles', ArticleController.readAll);
router.get('/:blogId/articles', ArticleController.read);
router.post('/:blogId/articles', ArticleController.create);
router.put('/articles', ArticleController.update);
router.delete('/articles', ArticleController.delete);

// /* Hashtag */
// router.get('/Hashtag', CommentController.readAll);
// router.get('/articles/:articleIdx/comments', CommentController.read);
// router.post('/articles/:articleIdx/comments', CommentController.create);
// router.put('/articles/:articleIdx/comments', CommentController.update);
// router.delete('/articles/:articleIdx/comments', CommentController.delete);

module.exports = router;