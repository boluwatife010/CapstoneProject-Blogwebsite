// Import necessary modules and types
import { PostModel } from "../models/post";
import {
  CommentPostRequestBody,
  CreatePostRequestBody,
  EditPostRequestBody,
  LikesPostRequestBody,
  DislikePostRequestBody,
} from '../interfaces/post.types';

// Function to retrieve all posts
export const getAllPosts = async (): Promise<any> => {
  // Use the PostModel to find all posts in the database
 const allPosts = await PostModel.find();
 return allPosts;
};

// Function to create a new post
export const createPost = async (body: CreatePostRequestBody): Promise<any> => {
  const { title, content, author } = body;
  // Create a new post using the provided data and save it to the database
  return await PostModel.create({
    title,
    content,
    author,
  });
};

// Function to retrieve a specific post by its ID
export const getApost = async (id: string): Promise<any> => {
  // Use the PostModel to find a post by its ID
  const post = await PostModel.findById(id);
  // Return the found post, or it will be undefined if not found
  return post;
}

// Function to edit an existing post by its ID
export const editPostById = async (id: string, body: EditPostRequestBody): Promise<any> => {
  const { title, content } = body;
  // Find the post to edit by its ID
  const editing = await PostModel.findById(id);
  if (!editing) {
    throw new Error('Not found');
  }
  // Update the post properties if new values are provided
  if (title) {
    editing.title = title;
  }
  if (content) {
    editing.content = content;
  }
  // Save the updated post and return it
  await editing.save();
  return editing;
};

// Function to delete a post by its ID
export const deletePostbyId = async (id: string): Promise<any> => {
  // Find the post to delete by its ID
  const post = await PostModel.findById(id);
  if (!post) {
    throw new Error('Not found');
  }
  // Delete the post from the database
  await post.deleteOne();
};

// Function to add a comment to a post by its ID
export const commentPostbyId = async (Id: string, body: CommentPostRequestBody): Promise<any> => {
  const { comments } = body;
  const commenting = await PostModel.findById(Id);
  if (!commenting) {
    throw new Error ('No comments inputed.');
  }
  if (comments && comments.length > 0) {
    commenting.comments.push(...comments);
    await commenting.save();
    console.log(commenting);
  }
  return  commenting;
  }
// Function to add likes to a post by its ID
export const likePostbyId = async (id: string, body: LikesPostRequestBody): Promise<any> => {
  // Find the post to like by its ID
  const liking = await PostModel.findById(id);
  const { likes } = body;
  if (!liking) {
    throw new Error('Not Found');
  }
  // Update the post's likes property if provided
  if (likes !== undefined) {
    liking.likes.push(...likes);
  }
  // Save the updated likes and return them
  await liking.save();
  return liking.likes;
};

// Function to add dislikes to a post by its ID

export const dislikePostById = async (id: string, body: DislikePostRequestBody): Promise<any> => {
    // Find the post to dislike by its ID
    const disliking = await PostModel.findById(id);
   // Extract the dislikes property from the request body
    const { dislikes } = body;
    if (!disliking) {
      throw new Error('Post not found');
    }
    // Update the post's dislikes property if provided
    if (dislikes !== undefined) {
      disliking.dislikes.push(...dislikes);
    }
    // Save the updated post with dislikes
    await disliking.save();
    // Return the updated dislikes
    return disliking.dislikes;
  };

// Function to remove a like from a post by its ID
export const unlikePostById = async (id: string, body: LikesPostRequestBody): Promise<any> => {
  // Find the post to unlike by its ID
  const unliking = await PostModel.findById(id);
  if (!unliking) {
    throw new Error('Post not found');
  }
    if (unliking.likes !== undefined) {
    // Ensure body.likes is a valid string before proceeding
    if (typeof body.likes === 'string') {
      // Find the index of the like in the likes array and remove it
      const likeIndex = unliking.likes.indexOf(body.likes);
      if (likeIndex !== -1) {
        unliking.likes.splice(likeIndex, 1); // Remove the like
      } else {
        throw new Error('Like not found'); // Handle case when the like is not found
      }

      // Save the updated post and return it
      await unliking.save();
      return unliking;
    } else {
      throw new Error('Invalid like value');
    }
  } else {
    throw new Error('Post has not been liked');
  }
};

// Function to remove a dislike from a post by its ID
export const revertDislikePostById = async (id: string, body: DislikePostRequestBody): Promise<any> => {
  // Find the post to revert the dislike by its ID
  const reverting = await PostModel.findById(id);
  if (!reverting) {
    throw new Error('Post not found');
  }

  if (reverting.dislikes !== undefined) {
    // Ensure body.dislikes is a valid string before proceeding
    if (typeof body.dislikes === 'string') {
      // Find the index of the dislike in the dislikes array and remove it
      const dislikeIndex = reverting.dislikes.indexOf(body.dislikes);
      if (dislikeIndex !== -1) {
        reverting.dislikes.splice(dislikeIndex, 1); // Remove the dislike
      } else {
        throw new Error('Dislike not found'); // Handle case when the dislike is not found
      }

      // Save the updated post and return it
      await reverting.save();
      return reverting;
    } else {
      throw new Error('Invalid dislike value');
    }
  } else {
    throw new Error('Post has not been disliked');
  }
};
export const removeCommentFromPostById = async (postId: string, commentId: string): Promise<any> => {
  try {
    // Find the post by its ID
    const post = await PostModel.findById(postId);

    if (!post) {
      throw new Error('Post not found.');
    }

    // Find the index of the comment to remove in the comments array
    const commentIndex = post.comments.findIndex(comment => comment.commentid === commentId);

    if (commentIndex === -1) {
      throw new Error('Comment not found.');
    }

    // Remove the comment from the comments array
    post.comments.splice(commentIndex, 1);

    // Save the updated post
    await post.save();

    // Return the updated post without the removed comment
    return post;
  } catch (error) {
    console.error('Error removing comment:', error);
    throw new Error('Failed to remove comment');
  }
};
