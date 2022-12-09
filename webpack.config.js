const path=require('path');

module.exports={
    mode:'production',
    entry:'./public/index.js',
    output:{
        filename:'main.js',
        path:path.join(__dirname,'public')
    }
}