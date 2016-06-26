// get host & protocol
var sHost = window.location.host;
var sProtocol = window.location.protocol;
// API url
const API_URL = sProtocol+'//'+sHost;

function addUser() {
  	// make ajax call
  	var userName = $('#rusername').val();
  	var email = $('#remail').val();
  	var password = $('#rpassword').val();

	$.ajax({
	    url  : API_URL+'/addUser',
	    data : {
	      'userName'    : userName,
	      'email' 		: email,
	      'password'	: password
	    },
	    type : 'POST',
	    success : function(response) {
	    	console.log(JSON.stringify(response));
	    }
	});
}

$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$("#register-form").submit(function(e) {
		e.preventDefault();
		console.log('hello');
		addUser();
	});
});
