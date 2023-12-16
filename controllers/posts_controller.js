const Post = require('../models/post')

const Comment = require('../models/comments');

const Like = require('../models/like');

module.exports.create = async function(req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        console.log('Post created:', post);
        req.flash('success' , 'Post published')
        return res.redirect('back');
    } catch (err) {
        console.log('Error in creating the post:', err);
        req.flash('error'  , err)
        return res.redirect('back');
    }
};

// module.exports.destroy =  function(req , res){
//     Post.findById(req.params.id  , function(err, post){
//         if(post.user == req.user.id){
//             post.remove();

//             Comment.deleteMany({post: req.params.id} , function(err){
//                 return res.redirect('back');
//             })
            
//         }else{
//             return res.redirect('back');
//         }
//     });
// }

module.exports.destroy = async function (req, res) {
    try {
      const postId = req.params.id;
  
      // Find the post with the provided postId using async/await
      const post = await Post.findById(postId).exec();
  
      if (post && post.user == req.user.id) {
        
        //deleting the associated likes with its post and comments 
        await Like.deleteMany({likeable: post._id, onModel: 'Post'});
        await Like.deleteMany({_id: {$in: post.comments}});
        // Check if the user is the owner of the post (compare the user IDs as strings)
        // If the user is the owner, proceed with deletion
        await post.deleteOne();
  
        // Delete associated comments using async/await
        await Comment.deleteMany({ post: postId }).exec();
        
        req.flash('success'  , 'Post and comments associated to it deleted')
        return res.redirect('back');
      } else {
        // If the post is not found or the user is not the owner, redirect back
        return res.redirect('back');
      }
    } catch (error) {
      // Log the specific error message to the console for debugging purposes
      console.error('Error deleting post:', error);
      req.flash('error' , 'You canot delete the post')
  
      // Send a more specific error message to the client
      res.status(500).json({ error: 'An error occurred while deleting the post.' });
    }
  };
  
  
  
  
  







