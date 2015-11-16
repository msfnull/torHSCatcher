var fs = require('fs'),
    http = require('http');
var toLog = function(text){
    console.log(text);
    fs.appendFileSync('onionlog.txt',text+'\r\n',"UTF-8",{'flags':'a+'});
}
var scanFor = function(address){
    console.log('Scanning for',address);
    var options = {method: 'HEAD', host: address, port: 80, path: '/'};
    var req = http.request(options, function(r){
        r.on('data',function(data){
            toLog(address+' accessible');
            console.log(address,'accessible');
        });
    });
    req.on('error',function(e){
        toLog(address+' not accessible');
        console.log(address,'not accessible');
    });
    req.end();
}
if(process.argv[2].toString() === '-s'){
    if(process.argv[3]!=null){
        scanFor(process.argv[3]);
    } else {
        console.log('For test usage: nodejs app.js -s <Onion Address>');
    }
}
