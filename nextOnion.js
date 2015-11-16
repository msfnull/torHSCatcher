var fs = require('fs');

var nextAddress = function(last,callback){
    if(last == '') last = 'aaaaaaaaaaaaaaaa';
    generateNext(last,function(next){
        fs.writeFile('./lOA.txt',next);
        console.log('it will write',next);
        callback(next);
    });
}
var generateNext = function(last,callback){
    console.log('generating next for',last);
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    if(last.length == 16){
        for(var pos = last.length-1;pos>=0;pos--){
            console.log('checking position',pos);
            if(last[pos] != '9'){
                console.log('last char is',last[pos]);
                var i = chars.indexOf(last[pos]);
                console.log('it position is',i);
                i++;
                console.log('next char is',chars[i]);
                last = last.split('');
                last[pos] = chars[i];
                last = last.join('');
                console.log('next is',last);
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
