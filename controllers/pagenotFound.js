const path = require('path');
exports.err=(req, res, next) => {
    res.render(path.join(__dirname,'..','views','pagenotFound'));
}