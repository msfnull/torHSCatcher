var fs = require('fs'),
    net = require('net'),
    nextAddress = require('./nextOnion'),
    next = '9999999999999999',
    sleep = require('sleep');
    request = require('request');
    toLog = function(text){
        fs.appendFileSync('onionlog.txt',text+'\r\n',"UTF-8",{'flags':'a+'});
    },
    scanFor = function(address){
	var Agent = require('socks5-http-client/lib/Agent');
	request({
	    url: 'http://'+address,
	    agentClass: Agent,
	    agentOptions: {
	        socksHost: 'localhost', // Defaults to 'localhost'.
	        socksPort: 9050 // Defaults to 1080.
	    }
	}, function(err, res) {
	    if(!err){
		var title = res.body.match(/<title[^>]*>([^<]+)<\/title>/)[1];
		console.log(address,'-',title);
		toLog(address+' '+title);
	    } else console.log(address,'not reachable');
	    getNextAndTest();
	});
    },
    getNextAndTest = function(){
        nextAddress(next,function(nextCame){
            next = nextCame;
            scanFor(next+'.onion');
        });
    };
if(process.argv[2]){
	if(process.argv[2].toString() === '-s'){
	    if(process.argv[3]!=null){
	        scanFor(process.argv[3]);
	    } else {
	        console.log('For test usage: nodejs app.js -s <Onion Address>');
	    }
	}
}else{
    for(var i=0;i<100;i++)getNextAndTest();
}
