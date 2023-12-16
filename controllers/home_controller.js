const Post =require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    try {
      const posts = await Post.find({}).sort('-createdAt').populate('user').populate({
        path: 'comments',
        populate : {
          path: 'user'
        }
      }).populate({
        path:'comments',
        populate:{
          path:'likes'
        }
      }).populate('likes');  /// populate is for getting full user from posts

      const users = await User.find({});
      
      return res.render('home', {
        title: 'Home',
        posts: posts,
        all_users: users
      });
    } catch (err) {
      // Handle any errors that occur during the query
      console.error('Error fetching posts:', err);
      return res.status(500).send('Internal Server Error');
    }


};