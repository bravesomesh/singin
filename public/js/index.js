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
	    	sessionStorage.setItem('token', response.token);
	    	sessionStorage.setItem('email', email);
	    	window.location.href = '/dashboard.html';
	    }
	});
}

function login() {
  	// make ajax call
  	var email = $('#username').val();
  	var password = $('#password').val();

	$.ajax({
	    url  : API_URL+'/login',
	    data : {
	      'email'    : email,
	      'password'	: password
	    },
	    type : 'POST',
	    success : function(response) {
	    	sessionStorage.setItem('token', response.token);
	    	sessionStorage.setItem('email', email);
	    	window.location.href = '/dashboard.html';
	    }
	});
}

if(sessionStorage.getItem('email') !== undefined && sessionStorage.getItem('email') !== null) {
	window.location.href = '/dashboard.html';
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
	$( "#register-form" ).validate({
		rules: {
			rusername: "required",
			remail: "required",
			rpassword: "required",
			password_again: {
			  equalTo: "#rpassword"
			}
		},
		submitHandler : function(form) {
			addUser();			
		}
	});
	$( "#login-form" ).validate({
		rules: {
			username: "required",
			password: "required"
		},
		submitHandler : function(form) {
			login();			
		}
	});
});
