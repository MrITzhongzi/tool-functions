const fs = require('fs')

/**
 * 异步文件拷贝
 * @param {*} src  源文件路径
 * @param {*} distPath  目标文件路径 
 * @param {*} callback  拷贝完成执行的回调
 */
const copy = (src,distPath,callback) =>{
  fs.readFile(src,(err,data)=>{
    if(err) throw err
    fs.writeFile(distPath,data,(err)=>{
      if(err) throw err
        //回调
      if(callback){
        callback();
      }
    })
  })
}

