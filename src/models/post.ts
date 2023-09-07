import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema =  new Schema(
    {
      title: {type: String, required: true, min: 20, max: 60},
      content: String,
      author: String,
      likes: [String],
      dislikes: [String],
      comments: [{commentid: String},  {comment: String}, {userid: String}]
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } } 
);
export const PostModel = mongoose.model('posts', postSchema);