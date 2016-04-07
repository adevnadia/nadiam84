var
	express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	winston = require('winston');

winston.add(winston.transports.File, { filename: 'errors.log', handleExceptions: true });

process.on('uncaughtException', function (err) {
	winston.log('error', err.stack || err.message);
});

app.set('port', process.env.PORT || 3000);
app.set('dirname', __dirname);
app.set('views', app.get('dirname') + '/views');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cookieParser());
app.use(session({
	secret: 'session secret',
	name: 'session.sid',
	resave: true,
	saveUninitialized: true
}));


require('./server/routes')(app, express);

if (process.env.node_env == 'development') {
	app.use(require('chromelogger').middleware);
}

app.listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});