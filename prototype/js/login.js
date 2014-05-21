


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
		app.demo = 'new';
	};
};


app.switchDemo = function (demo) {

	var afterlogin = $('.login button');

	switch(demo) {
	case 'new' :
		afterlogin.data('page', 'welcome');
		break;
	case 'returning' :
		afterlogin.data('page', 'key');
		break;
	default :
		break;
	};

	app.switchPage('home');
	app.setHeader('login') 

	var msg = 'demo swithed to ' + demo + ' user';
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

app.persona = function () {
    window.open("http://placekitten.com/g/550/400", "_blank", "toolbar=no, location=no, scrollbars=no, resizable=no, status=no, top=500, left=100, width=500, height=300");
};

app.setListeners = function () {
	$('body').on('click', '.pagelink', function(evt){
		evt.preventDefault();
		var id = $(this).data('page');
		app.switchPage(id);
	});

	$('body').on('click', '.loginsubmit', function(evt){
		if( app.demo === 'new'){
			console.log('login submitted');
			app.setHeader('user','Your Profile')
			app.notice('Success! You are now logged in.');	
			app.fakeEmail('firstemail');		
		} else if ( app.demo === 'returning') {
			app.fakeEmail('keyemail');					
		}
	});

	$('body').on('click', '.keysubmit', function(evt){
		app.setHeader('user', 'Patricio')
		app.notice('Success! You are now logged in.');
	});

	$('.demo select').find('option[value="new"]').attr("selected",true);

	$('.demo').on('change', 'select', function () {
		app.demo =  $('.demo option:selected').val();
		app.switchDemo(app.demo);
	});

	$('.logout').on('click', function () {
		app.logout();
	});


	$('#confirmationlink').on('click', function () {
		app.switchPage('user');
		app.notice('You account is now confirmed.');
	});

	$('.keylink').on('click', function () {
		app.switchPage('home');
		app.notice('You are now logged in.');
		app.setHeader('user', 'Patricio')
	});

	$('.persona').on('click', app.persona);

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

