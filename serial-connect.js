$(document).ready(function(){
	$("#connectForm").hide();

	chrome.serial.onReceive.addListener(onReceiveCallback);
	
	$("#findButton").click(function(){
		$("#connectForm").hide(500);
		$("#instructions").text("Searching for device...");
		$("#findButton").attr('disabled','disabled'); //Disable find button (renabled in onTimeout)
		disconnectAll(); //Disconect all open connections
		foundCore = false;
		chrome.serial.getDevices(onGetDevices);
		setTimeout(onTimeout,8000);
	});
	
	$("#connectButton").click(function(){
		$("#findButton").attr('disabled','disabled');
		$("#connectButton").attr('disabled','disabled');
		$("#instructions").text("Please wait while your device attempts to connect.");
		onWifiConnect();
	});
});

var connections = {}; //to store ConnectionId: "String received"
var foundCore = false;
var coreConnectionId;

var onGetDevices = function(ports) {
	console.log("Searching Ports...");	
	for (var i = 0; i < ports.length; i++) {
	 	var comName = ports[i].path;
	 	console.log("Found serial device at path: " + comName);
	 	chrome.serial.connect(comName, onIdentifyConnect); 
	}
};

var onIdentifyConnect = function(connectionInfo){
	var cId = connectionInfo.connectionId;
	connections[cId] = ""; 
	console.log("Connection Id: " + cId);
	chrome.serial.send(cId,str2ab("i"),function(sendInfo){
		console.log("Sent " + sendInfo.bytesSent + " bytes.");
	});
};
	
var onReceiveCallback = function(info) {
	if (info.data) {
		var str = ab2str(info.data);
		if (str.charAt(str.length-1) === '\n') {
			connections[info.connectionId] += str.substring(0, str.length-1);
			onLineReceived(connections[info.connectionId], info);
			connections[info.connectionId] = '';
		} else {
			connections[info.connectionId] += str;
		}
	}
};

var onLineReceived = function(receivedMsg, info){
	console.log(receivedMsg);
	if(receivedMsg.substring(0,15) == "Your core id is"){
		console.log("Found core: " + receivedMsg.substring(16,receivedMsg.length));
		foundCore = true;
		coreConnectionId = info.connectionId; //TODO: deal with multiple cores
		$("#instructions").text("Found device.")
		$("#device-id").val(receivedMsg.substring(16,receivedMsg.length));
		$("#connectButton").removeAttr('disabled');
		$("#connectForm").show(500);
	}
};

var onTimeout = function(){
	$("#findButton").removeAttr('disabled');
	if (!foundCore){
		$("#instructions").text("No device found. " + 
			"Verify that the device is in listening mode " +
			"and well connected via usb, then try again.");
	}
};

var onWifiConnect = function(){
	
	var send2Core = function(msg){
		chrome.serial.send(coreConnectionId,str2ab(msg),function(sendInfo){});
	};
	var ssid = $("#ssid").val() + "\n";
	var password = $("#password").val() + "\n";
	var security = $("#security").val() + "\n";

	send2Core("w");
	
	setTimeout(function(){
		send2Core(ssid);
		console.log(ssid);
	},1500);
	
	setTimeout(function(){
		send2Core(security);
		console.log(security);
	},3000);
	
	if(security != 0){
		setTimeout(function(){
			send2Core(password);
			console.log(password);},
			4500);
	}

	setTimeout(function(){
		$("#findButton").removeAttr('disabled');
	}, 6000);
	
};

// Disconnect
var disconnectAll = function(){
	for (con in connections){
		chrome.serial.disconnect(parseInt(con), onDisconnect);
		delete connections[con]; //TO DO: only delete if disconnect succeeds
	}
};

var onDisconnect = function(result) {
	if (result) {
		console.log("Disconnected from the serial port");
	} else {
		console.log("Disconnect failed");
	}
};

//String <-> Array Buffer conversions
function str2ab(str) {
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);
  for (var i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
};
