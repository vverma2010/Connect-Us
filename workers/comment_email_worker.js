const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

queue.process('emails',function(job,done){
    console.log('Emails worker is processing job',job);
    commentsMailer.newComment(job.data);

    done();
});