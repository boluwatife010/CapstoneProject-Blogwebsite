// Import required modules from blog.services
import { createPost, getAllPosts, getApost, editPostById, 
  deletePostbyId, likePostbyId, commentPostbyId, dislikePostById, 
  unlikePostById, revertDislikePostById } from "../services/blog.services";
import express from 'express';

// Route handler to get all posts
export const getAllHandler = async (req: express.Request, res: express.Response) => {
  const getPosts = await getAllPosts();
  return res.status(200).send(getPosts);
};
// Route handler to create a new post
export const createPostHandler = async (req: express.Request, res: express.Response) => {
  const { title, content, author } = req.body;
  try {
    if (!title || !author || !content) {
      return res.status(400).send({ message: 'Title, author, and content are required' });
    }
    if (title.length < 5 || title.length > 80) {
      return res.status(400).send({ message: 'Title must be between 5 and 80 characters' });
    }
    const post = await createPost({ title, content, author});
    return res.status(200).send(post);
  } catch (e: any) {
    if (e.message === 'NOT_FOUND') {
      return res.status(404).send({ message: 'Post not found' });
    }
    return res.status(400).send({ message: 'Invalid request' });
  }
};
// Route handler to get a specific post by ID
export const getAPostHandler = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  try {
    // Check if the id parameter is present
    if (!id) {
      return res.status(400).send({message: 'Please provide the post ID'});
    }
    // Check if the post exists
    const post = await getApost(id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    // Return the post
    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send({message: 'Internal server error'});
  }
};
// Route handler to edit an existing post
export const editPostHandler = async (req: express.Request, res: express.Response) => {
  const { title, content } = req.body;
  const { id } = req.params;
  try {
    const edit = await editPostById(id, {
      title,
      content
    });
    return res.status(200).send(edit);
  } catch (e) {
    return res.status(500).send({message: 'Internal server error'});
  }
};
// Route handler to delete a post
export const deletePostHandler = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  try {
    await deletePostbyId(id);
    return res.status(200).send({ message: 'Post was deleted successfully' });
  } catch (e) {
    return res.status(500).send({message: 'Internal server error'});
  }
};
// Route handler to add a comment to a post
export const commentPostHandler = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { comments } = req.body;
  try {
    // Check if 'comments' is not empty
    if (!comments) {
      return res.status(400).send({ message: 'Comment cannot be empty' });
    }
    // Call the 'commentPostbyId' function to add comments to the post
    const yourComments = await commentPostbyId(id, {comments});
    if (!yourComments) {
      // Handle the case where 'commentPostbyId' returns false or an error
      console.log(yourComments);
      return res.status(400).send({ message: 'Failed to add comments' });
    }
    // Return a success response with the added comments
    return res.status(200).send(yourComments);
  } catch (error) {
    console.log('Error adding comments:', error);
    // Handle any unexpected errors with a 500 server error response
    return res.status(500).send({ message: 'Internal server error' });
  }
};
// Route handler to add likes to a post
export const likePostHandler = async (req: express.Request, res: express.Response) => {
  const { likes } = req.body;
  const { id } = req.params;
  try {
    const liking = await likePostbyId(id, { likes });
    return res.status(200).send(liking);
  } catch (e) {
    return res.status(500).send('Internal server error');
  }
};
// Route handler to add dislikes to a post
export const dislikePostHandler = async (req: express.Request, res: express.Response) => {
  const { dislikes } = req.body;
  const { id } = req.params;
  try {
    const disliking = await dislikePostById(id, { dislikes });
    return res.status(200).send(disliking);
  } catch (e) {
    return res.status(500).send('Internal server error');
  }
};
// Route handler to remove a like from a post
export const unlikePostHandler = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { likes } = req.body;
  try {
    const unlikes = await unlikePostById(id, { likes });
    return res.status(200).send(unlikes);
  } catch (e) {
    return res.status(500).send('Internal server error');
  }
};
// Route handler to remove a dislike from a post
export const revertDislikePostHandler = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { dislikes } = req.body;
  try {
    const reverted = await revertDislikePostById(id, { dislikes });
    return res.status(200).send(reverted);
  } catch (e) {
    return res.status(500).send('Internal server error');
  }
};
