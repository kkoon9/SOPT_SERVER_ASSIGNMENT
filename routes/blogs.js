const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blogController');
const ArticleController = require('../controllers/articleController');
const CommentController = require('../controllers/commentController');

/* Blog */
router.get('/', BlogController.readAll);
router.get('/blogIdx', BlogController.readblogIdx);
router.get('/host', BlogController.readHost);
router.post('/',BlogController.create);
router.put('/',BlogController.update);
router.delete('/',BlogController.delete);

/* Article */
router.get('/articles', ArticleController.readAll);
router.get('/:blogIdx/articles', ArticleController.read);
router.post('/:blogIdx/articles', ArticleController.create);
router.put('/:blogIdx/articles', ArticleController.update);
router.delete('/:blogIdx/articles', ArticleController.delete);

/* Comment */
router.get('/articles/comments', CommentController.readAll);
router.get('/articles/:articleIdx/comments', CommentController.read);
router.post('/articles/:articleIdx/comments', CommentController.write);
module.exports = router;