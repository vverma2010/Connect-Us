module.exports.home = function(req,res)
{
    // return res.end('<h1>express is up for ConnectUs</h1>');
    return res.render('home' , {
        title: "Home"
    });
}

//  module.exports.actionName = function(req,res){}