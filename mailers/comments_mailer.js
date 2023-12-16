const nodeMailer = require('../config/nodemailer');

//this is new way of exporting
exports.newComment = (comment) =>{
    console.log('Inside newComment mailer ');

    let htmlString = nodeMailer.renderTemplate({comment: comment} , '/comments/comments_mailer.ejs')


    nodeMailer.transporter.sendMail({
        from: 'onidakumar86@gmail.com',
        to: comment.user.email,
        subject: "new commet Published",
        // html: '<h1>Yup your comment is Published </h1>'
        html: htmlString
    }, (err , info) =>{
        if(err){
            console.log('Error in sendig the mail' , err);
            return;
        }

        console.log('Mail is sent' , info);
        return;
    });
}