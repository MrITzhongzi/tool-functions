const fs = require('fs')
/**
 *  同步小文件拷贝
 * @param {*} src 源文件路径 
 * @param {*} distPath 目标文件路径
 * @param {*} callback  复制完成的回调
 */
const copySync = (src,distPath,callback) => {
  var readContent = fs.readFileSync(src);

  fs.writeFileSync(distPath,readContent);
  if(callback){
    callback()
  }
}
