var fs = require('fs');

var nextAddress = function(last,callback){
    if(last == '') last = 'aaaaaaaaaaaaaaaa';
    generateNext(last,function(next){
        fs.writeFile('./lOA.txt',next);
        callback(next);
    });
}
var generateNext = function(last,callback){
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    if(last.length == 16){
        for(var pos = last.length-1;pos>=0;pos--){
            if(last[pos] != '9'){
                var i = chars.indexOf(last[pos]);
                i++;
                last = last.split('');
                last[pos] = chars[i];
                last = last.join('');
                break;
            }else{
                last = last.split('');
                last[pos] = 'a';
                last = last.join('');
            }
        }
    }
    callback(last);
};
module.exports = nextAddress;
