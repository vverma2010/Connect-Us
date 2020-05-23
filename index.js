const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customWare = require('./config/middleware');
const passportJwt = require('./config/passpost-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
// setup for chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_socket').chatSockets(chatServer); 
// the 'chatSockets' used second time is the function used in chat_socket.js
chatServer.listen(5000);
console.log('Chat server is running on port 5000');
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
    



}));
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
// make the upload path available for the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
// use express router
app.use(expressLayouts); 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// set view engine
app.set('view engine','ejs');
app.set('views','./views');



// Mongo Store is used to store the session cookie in the db
app.use(session({
    name:'ConnectUs',
    //TODO chage the secret before deployment in production mode
    secret: 'blah-blah',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err)
        {
            console.log(err || 'connect-mongodb setup ok');
        }
    )


}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customWare.setflash);

// use express router
app.use('/',require('./routes'));



app.listen(port,function(err){
    if(err)
    {
        console.log(`error : ${err}`);
    }

    console.log(`server is running on port : ${port}`);


});
