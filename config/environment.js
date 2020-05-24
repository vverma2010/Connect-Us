

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
    jwt_secret: 'connectus'
    
}

const production = {
    name: 'production'
}

module.exports = development;