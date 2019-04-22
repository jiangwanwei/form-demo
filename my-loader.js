/**
 * Created by Administrator on 2016/5/25.
 */
var loaderUtils = require("loader-utils");

module.exports = function(content) {

    // require.context(".",true,/\/src\/template\/(\w+)\/index.html/).keys().forEach(function(key){
    //     console.log(key);
    // })

    //console.log(content);
    var query = loaderUtils.parseQuery(this.query);
    //this.cacheable && this.cacheable();
    this.value = content;


    var srcPath=loaderUtils.stringifyRequest(this,(query.srcRoot||__dirname+"/src")).slice(1,-1);

    content=content.replace(new RegExp("%srcRoot%","g"),srcPath)

    Object.keys(query).forEach(function(key){
        if(key!="srcRoot") {
            content = content.replace(new RegExp("%" + key + "%", "g"), query[key]);
        }
    })


    return content;//"module.exports = " + JSON.stringify(content);
}
// module.exports.seperable = true;
// module.exports.pitch = function(remainingRequest, precedingRequest, data) {
//     //if(someCondition()) {
//         // fast exit
//     console.log(remainingRequest, precedingRequest, data);
//      //   return "module.exports = require(" + JSON.stringify("-!" + remainingRequest) + ");";
//     //}
//     //data.value = 42;
// };