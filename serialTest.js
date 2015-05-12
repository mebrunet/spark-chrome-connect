window.onload = function(){
	var serialButton = document.getElementById("serialButton");
	serialButton.onclick = function(){
		chrome.serial.getDevices(function(ports) {
			console.log("Searching Ports...");
	  		for (var i = 0; i < ports.length; i++) {
    		 	var comName = ports[i].path;
    		 	console.log("Found serial device at path: " + comName);
    		 	chrome.serial.connect(comName,function(connectionInfo){
    		 		var cId = connectionInfo.connectionId;
    		 		console.log("Connection Id: " + cId);
    		 		chrome.serial.send(cId,str2ab("i"),function(sendInfo){
    		 			console.log("Sent " + sendInfo.bytesSent + " bytes.");
    		 		})
    		 	});
	  		}
		});
	};

	var receivedMsg = "";
	chrome.serial.onReceive.addListener(function(info){
		receivedMsg += ab2str(info.data).toString();
		console.log(receivedMsg);
		/*
		chrome.serial.getControlSignals(info.connectionId,function(signals){
			console.log("dcd: " + signals.dcd + ", cts: " + signals.cts + ", ri: " + signals.ri + ", dsr: " + signals.dsr);
		});
		*/
	});

	var disconnectButton = document.getElementById("disconnectButton");
	disconnectButton.onclick = function(){
		chrome.serial.getConnections(function(connectionInfos){
			chrome.serial.disconnect(connectionInfos[0].connectionId,function(result){
    			console.log("Disconected: " + result);
			});
    	});
	};
};

//Convert String to Array 
function str2ab(str) {
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);
  for (var i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

/*
  chrome.serial.getDevices(function(ports) {
	  var portObjects = new Array(ports.length);
	  for (var i = 0; i < ports.length; i++) {
	    portObjects[i] = {
	      comName: ports[i].path,
	      manufacturer: ports[i].displayName,
	      serialNumber: '',
	      pnpId: '',
	      locationId:'',
	      vendorId: '0x' + (ports[i].vendorId||0).toString(16),
	      productId: '0x' + (ports[i].productId||0).toString(16)
	    };
	    console.log(portObjects[i].comName);
	  	}
  });
*/