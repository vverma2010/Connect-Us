const queue = require('../config/kue');
const postsMailer = require('../mailers/posts_mailer');

queue.process('emails', function(job,done){
    postsMailer.newPost(job.data);

    done();
});