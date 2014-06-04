


var loggedin;

var app = {};




if ( !localStorage.webmakerin ) {
	localStorage.webmakerin = 'false';
	app.login = 'false';
} else if ( localStorage.webmakerin === 'true' ) { 
	app.login = 'true'; 
}


app.switchPage = function (id) {
	$('.page').hide();
	$('#' + id + 'page').delay(600).fadeIn(300);
};


app.setHeader = function (state,name) {

	var userlink = $('#userlink');
	var loginlink = $('#loginlink');

	switch(state) {
		case 'user' :
			userlink.show().find('span').text(name);
			loginlink.hide();
			break;
		case 'login' :
			userlink.hide();
			loginlink.show();
			break;
		default :
			break;
	};

};



app.checkLogin = function () { /* @todo persistence */
	if ( app.login === 'true' ) { 
		app.setHeader('user', 'Patricio')
	} else { 
		app.setHeader('login');
		app.demo = 'pwless-new';
	};
};


app.switchDemo = function (demo) {

	var afterlogin = $('.login button');
	var body = $('body')
	body.removeClass();
	$('#auth-required').hide(); // @todo abstract this

	// @todo rename new and returning to newuser returninguser
	switch(demo) {
		case 'pwless-new' :
			afterlogin.data('page', 'welcome');
			body.addClass('demo-pwless');
			break;
		case 'pwless-returning' :
			afterlogin.data('page', 'key');
			body.addClass('demo-pwless');
			break;
		case 'social-new' :
			body.addClass('demo-social');
			break;
		case 'social-returning' :
			body.addClass('demo-social');
			break;
		default :
			break;
	};

	app.switchPage('home');
	app.setHeader('login') 

	var msg = 'demo swithed to ' + demo;
	app.notice(msg);

};

app.logout = function () {
	app.switchPage('home');
	app.setHeader('login');
	app.notice('You are now logged out.');
};

app.notice = function (msg) {
	var notice = $('#notice');
	notice.html(msg).fadeIn().delay(2000).fadeOut();
};

app.copyForm = function () {
	var html = $('#loginpage').html();
	$('#helppage').append(html);
}

app.fakeEmail = function (id) {
	var email = $('.login input').val();
	$('.emailheader span').text(email);
	$('.email').hide();
	$('#' + id).fadeIn();
};

app.openEmail = function (elem) {
	elem.siblings('article').fadeToggle();
};

app.doLogin = function () {
	if( app.demo === 'pwless-new'){
		console.log('login submitted');
		app.setHeader('user','Your Profile')
		app.notice('Success! You are now logged in.');	
		app.fakeEmail('firstemail');		
	} else if ( app.demo === 'pwless-returning') {
		app.fakeEmail('keyemail');					
	}
};

app.popupLogin = function () {
    var popup = window.open("http://placekitten.com/g/550/400", "socialsignon", "toolbar=no, location=no, scrollbars=no, resizable=no, status=no, top=500, left=100, width=500, height=300");
    popup.focus();
	app.setHeader('user','Amira')
	app.notice('Success! You are now logged in.');	
};


app.reorderSocial = function () {
	var persona = $('.socialmore .persona').remove();
	// persona.appendTo('.socialmore p');
	$('.socialmore p').append('<a class="persona" href="#"><i class="fa fa-user"></i> Persona</a>');
	var mysocial = $(this).remove();
	mysocial.prependTo('.socialmore p');
};

app.setListeners = function () {
	$('body').on('click', '.pagelink', function(evt){
		evt.preventDefault();
		var id = $(this).data('page');
		app.switchPage(id);
	});

	$('.loginsubmit').on('click', function(evt){
		app.doLogin();
	});

	$('.keysubmit').on('click', function(evt){
		app.setHeader('user', 'Patricio')
		app.notice('Success! You are now logged in.');
	});

	$('.demo select').find('option[value="pwless-new"]').attr("selected",true);

	$('.demo').on('change', 'select', function () {
		app.demo =  $('.demo option:selected').val();
		app.switchDemo(app.demo);
	});

	$('.logout').on('click', function () {
		app.logout();
	});

	$('#confirmationlink').on('click', function () {
		$('#auth-required').hide();
		app.switchPage('user');
		app.notice('Your account is now confirmed.');
	});

	$('.keylink').on('click', function () {
		var msg = $(this).data('msg');
		console.log(msg);
		app.switchPage('home');
		app.notice(msg);
		app.setHeader('user', 'Patricio')
	});

	$('.persona, .social-btn').on('click', app.popupLogin);

	$('.social-btn').one('click', app.reorderSocial);

	$('.email h2').on('click', function () {
		app.openEmail($(this));
	});

};


app.init = function () {
	$('#homepage').fadeIn();
	app.setListeners();
	app.checkLogin();
	app.copyForm();
};





app.init();

