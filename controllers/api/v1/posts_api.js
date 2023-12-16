const Post = require('../../../models/post');

const Comment = require('../../../models/comments')


module.exports.index = async function(req , res){
    const posts = await Post.find({}).sort('-createdAt').populate('user').populate({
        path: 'comments',
        populate : {
          path: 'user'
        }
    }); 

    return res.json(200 , {
        message : "list of posts",
        posts : posts
    })
}

module.exports.destroy = async function (req, res) {
    try {
      const postId = req.params.id;
  
      // Find the post with the provided postId using async/await
      const post = await Post.findById(postId).exec();
  
    //   if (post && post.user == req.user.id) {
        // Check if the user is the owner of the post (compare the user IDs as strings)
        // If the user is the owner, proceed with deletion
        await post.deleteOne();
  
        // Delete associated comments using async/await
        await Comment.deleteMany({ post: postId }).exec();
        
        // req.flash('success'  , 'Post and comments associated to it deleted')
        // 
        return res.json(200 , {
            message: "Post and associated commets deleted "
        });
    //   } else {
    //     // If the post is not found or the user is not the owner, redirect back
    //     return res.redirect('back');
    //   }
    } catch (error) {
      // Log the specific error message to the console for debugging purposes
      console.error('Error deleting post:', error);
    //   req.flash('error' , 'You canot delete the post')
  
      // Send a more specific error message to the client
      res.status(500).json({ error: 'An error occurred while deleting the post.' });
    }
  };
  