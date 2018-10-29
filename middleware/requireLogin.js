module.exports = function(req, res, next){
    if(!req.session.userId){
        req.session.message = "YOU MUST BE KENNY LOGGED-INS"
        res.redirect('/auth/login')
    }else{
        next()
    }
}