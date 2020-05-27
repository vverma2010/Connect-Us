const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: "1d", // rotate daily
    path: logDirectory
  });

const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key:'blah-blah',
    db: 'Connect-Us Development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'connectus2020cu',
            pass: 'Connect@12345'
        },
        tls:{
            rejectUnauthorized: false
        }
        
    },
    google_client_ID:"993107559967-vehjeph9koecgm7fkf6h5vetlebb41ac.apps.googleusercontent.com",
    google_client_Secret: "tjn9E7MrhR_oljiXt4FItmXY",
    google_callback_URL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'connectus',
    morgan : {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
    
}

const production = {
    name: 'production',
    asset_path: process.env.CONNECTUS_ASSET_PATH,
    session_cookie_key:process.env.CONNECTUS_SESSION_COOKIE_KEY,
    db: process.env.CONNECTUS_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CONNECTUS_GMAIL_USERNAME,
            pass: process.env.CONNECTUS_GMAIL_PASSWORD,
        },
        tls:{
            rejectUnauthorized: false 
        }
        
    },
    google_client_ID:process.env.CONNECTUS_GOOGLE_CLIENT_ID,
    google_client_Secret: process.env.CONNECTUS_GOOGLE_CLIENT_SECRET,
    google_callback_URL: process.env.CONNECTUS_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CONNECTUS_JWT_SECRET,
    morgan : {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}


module.exports = eval(process.env.CONNECTUS_ENVIRONMENT)== undefined ? development : eval(process.env.CONNECTUS_ENVIRONMENT);