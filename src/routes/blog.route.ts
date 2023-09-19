import express from 'express';
import { authenticateToken } from '../services/auth.services';
const router = express.Router();
import {getAllHandler, createPostHandler, getAPostHandler, editPostHandler,
     deletePostHandler, likePostHandler, commentPostHandler,
       dislikePostHandler, unlikePostHandler,revertDislikePostHandler } from '../controller/blog.controller';
// Router endpoints for the blog with authentication in place
router.get('/', getAllHandler);
router.post('/create', authenticateToken, createPostHandler);
router.get('/name/:id', authenticateToken, getAPostHandler);
router.put('/edits/:id', authenticateToken, editPostHandler );
router.delete('/delete/:id', authenticateToken, deletePostHandler);
router.post('/comments/:id', authenticateToken, commentPostHandler);
router.post('/likes/:id', authenticateToken, likePostHandler);
router.post('/dislikes/:id', authenticateToken, dislikePostHandler);
router.post('/unlikes/:id', authenticateToken, unlikePostHandler);
router.post('/revert-dislike/:id', authenticateToken, revertDislikePostHandler);
export default router;