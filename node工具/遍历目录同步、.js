  const path = require('path')
  const fs = require('fs')

function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);
        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}

let readPath = path.join(__dirname,'../保易投1.3项目计划');
travel(readPath,()=>{
 
});