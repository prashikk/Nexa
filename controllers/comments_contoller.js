const Comment = require('../models/comments');
const Post = require('../models/post');
const Like = require('../models/like');
const commentsMailer = require('../mailers/comments_mailer');
// module.exports.create = async function(req , res){
//     Post.findById(req.body.post , function(err , post){
//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err , comment){
//                 //handle err
//                 post.comments.push(comment);
//                 post.save();
//                 res.redirect('/')
//             });
//         }
//     }) 
// }



module.exports.create = async function(req, res){

  try{
      let post = await Post.findById(req.body.post);

      if(post){
          let comment = await Comment.create({
              content: req.body.content,
              post: req.body.post,
              user: req.user._id
          });
          
          post.comments.push(comment);
          post.save();
          console.log('Comment created -->', comment);

          comment = await comment.populate('user' , 'name email');
          commentsMailer.newComment(comment);
          return res.redirect('back');
      }
  }
  catch(err){
      console.log('Error in creating comment -->', err);
      return;
  }
}

// module.exports.destroy = function(req , res){
//     Comment.findById(req.params.id , function(err , comment){
//         if(comment.user == req.user.id ){
//             let postId = comment.post;

//             comment.remove();

//             Post.findByIdAndUpdate(postId , {$pull: {comments: req.params.id}} , function(err , post){
//                 return res.redirect('back');
//             })
//         }else{
//             return res.redirect('back');
//         }
//     })
// }

module.exports.destroy = async function(req, res){
    
    try{
        let comment = await Comment.findById(req.params.id);
        
        if(comment.user == req.user.id ){
            let postId = comment.post;
            await comment.deleteOne();

            let post = await Post.findById(postId);
            post.comments.splice(post.comments.indexOf(req.params.id) , 1);
            await post.save();
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            res.redirect('back');
        }
    }
    catch(err){
        console.log('Error in deleting comment', err);
    }

}