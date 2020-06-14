const nodeMailer = require('../config/nodemailer');


exports.newPost = (post) => {
    console.log('Inside newPost mailer',post);

    nodeMailer.transporter.sendMail({
        from: 'connectus2020cu@gmail.com',
        to: post.user.email,
        subject: 'New Post Published',
        html: '<h1>Yup,your Post is Published</h1>'
    }, (err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;

        }
        console.log('Message Sent',info);
        return;
    });
}