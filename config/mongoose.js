const mongoose = require('mongoose');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://pankajpurshotam:patel123@cluster0.l9qysyp.mongodb.net/?retryWrites=true&w=majority');

}
const db=mongoose.connection;



//connecting mangoose
// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/codify_development');

// }

// //connecting db to mangoose connection 
// const db = mongoose.connection;




//checking successfully connected 
db.once('open' , function(){
    console.log('susscessfully connected to the database ');
})

module.exports = db;