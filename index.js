const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));
// use express router
app.use(expressLayouts); 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// set view engine
app.set('view engine','ejs');
app.set('views','./views');


app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`error : ${err}`);
    }

    console.log(`server is running on port : ${port}`);


});
