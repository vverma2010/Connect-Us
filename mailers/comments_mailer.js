const nodeMailer = require('../config/nodemailer');

// new way to export a method
// module.exports = newComment == exports.newComment
exports.newComment = (comment) => {
    console.log('Inside newComment mailer',comment);
    let htmlString = nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'connectus2020cu@gmail.com',
        to: comment.user.email,
        subject: 'New comment Pulished',
        html: htmlString
    }, (err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;

        }
        console.log('Message Sent',info);
        return;
    });
}