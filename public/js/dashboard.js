// get host & protocol
var sHost = window.location.host;
var sProtocol = window.location.protocol;
// API url
const API_URL = sProtocol+'//'+sHost;

if(sessionStorage.getItem('email') === undefined || sessionStorage.getItem('email') === null) {
	window.location.href = '/index.html';
}

$(function() {
	$('#userName').text(sessionStorage.getItem('email') + "'s Dashboard");
});

function logout () {
	sessionStorage.removeItem('email');
	sessionStorage.removeItem('token');
	window.location.href = "/index.html";
}