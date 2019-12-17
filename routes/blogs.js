const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blogController');
const ArticleController = require('../controllers/articleController');
const CommentController = require('../controllers/commentController');
const HashtagController = require('../controllers/hashtagController');

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

/* Comment */
router.get('/comments', CommentController.readAll);
router.get('/:articleId/comments', CommentController.read);
router.post('/:articleId/comments', CommentController.create);
router.put('/comments', CommentController.update);
router.delete('/comments', CommentController.delete);

/* Hashtag */
router.get('/hashtags', HashtagController.readAll);
router.get('/articles/:articleId/hashtags', HashtagController.read);
router.post('/articles/:articleId/hashtags', HashtagController.create);
router.put('/articles/:articleId/hashtags', HashtagController.update);
router.delete('/articles/:articleId/hashtags', HashtagController.delete);

module.exports = router;