var fs = require('fs'),
    http = require('http'),
    nextAddress = require('./nextOnion'),
    next = 'zqktlwi4fecvo6rh',
    scanned = true;
while(true){
    var toLog = function(text){
        fs.appendFileSync('onionlog.txt',text+'\r\n',"UTF-8",{'flags':'a+'});
    }
    var scanFor = function(address){
        console.log('Scanning for',address);
        var options = {method: 'HEAD', host: address, port: 80, path: '/'};
        var req = http.request(options, function(r){
            r.on('data',function(data,socket,head){
                console.dir(head);
                scanned = true;
                console.log(address,'accessible');
                toLog(address,'accessible');
            });
        });
        req.on('error',function(e){
            scanned = true;
        });
        req.end();
    }
    while(!scanned);
    nextAddress(next,function(nextCame){
        next = nextCame;
        scanned = false;
        scanFor(nextCame+'.onion');
    });
}
if(process.argv[2].toString() === '-s'){
    if(process.argv[3]!=null){
        scanFor(process.argv[3]);
    } else {
        console.log('For test usage: nodejs app.js -s <Onion Address>');
    }
}
