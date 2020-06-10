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
    db: 'Connect-Us_Development',
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
    },
    github_client_ID: "1b48631ffdbf833b865f",
    github_client_Secret: "5187921a292f9870e40366c0487cfad477b52194",
    github_callback_URL: "http://localhost:8000/users/auth/github/callback"
    
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
    },
    github_client_ID: process.env.CONNECTUS_GITHUB_CLIENT_ID,
    github_client_Secret: process.env.CONNECTUS_GITHUB_CLIENT_SECRET,
    github_callback_URL: process.env.CONNECTUS_GITHUB_CALLBACK_URL
}

module.exports = eval(process.env.NODE_ENV == undefined ? development : eval(process.env.NODE_ENV));