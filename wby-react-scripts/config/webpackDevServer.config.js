
const paths = require('./paths');
module.exports = function(proxy, allowedHost){
    return {
        contentBase: paths.appPublic,
        watchContentBase: true,
        public: allowedHost,
        publicPath: '/',
        inline:true
    }
}