module.exports.home = function(req,res)
{
    console.log(req.cookies);
    res.cookie('user_id', 04 );
    // return res.end('<h1>express is up for ConnectUs</h1>');
    return res.render('home' , {
        title: "Home"
    });
}

//  module.exports.actionName = function(req,res){}