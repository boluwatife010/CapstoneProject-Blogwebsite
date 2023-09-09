export interface CreatePostRequestBody {
    title: string,
    content: string,
    author: string,
}
export interface EditPostRequestBody {
    title: string,
    content: string
}
export interface CommentPostRequestBody {
    comments: [{
      comment: string;
      commentid: string;
    }];
  }
export interface LikesPostRequestBody {
    likes: [ string];
}
export interface DislikePostRequestBody {
    dislikes: [string];
}