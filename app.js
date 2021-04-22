require('dotenv').config();

// MODULES
const express       = require('express');

const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
// TODO: add cors if there is a frontend framework
// const cors		= require('cors');
const csrf          = require('csurf');
const path          = require('path');
const redis         = require('redis');
const session       = require('express-session');
const getFiles      = require('./modules/getFiles');

const RedisStore    = require('connect-redis')(session);

const app = express();

const PORT = process.env.PORT || 5000;

const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});

const SESSION_OPT = {
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: process.env.NODE_ENV === 'development',
        sameSite: true
    }
};

// TODO: remove this if not needed
// RENDERING ENGINE
app.use(require('./modules/hbs'));

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(require('morgan')('dev'));
}

// TODO: Remove if there is a frontend framework
if (process.env.NODE_ENV === 'development') {
    app.use('/static', express.static(path.join(__dirname, 'static')));
}

// app.use('cors');
app.use(session(SESSION_OPT));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrf({ cookie: true }));

// TODO: for api
// API ROUTES
for (const method of [ 'get', 'post', 'patch', 'delete' ]) {
    for (const file of getFiles(path.join(__dirname, `api/${method}`)).map(file => file.slice(0, -3))) {
        app[method](`/api/${file.replace(/_/g, ':').replace('/index', '/')}`, require(`./api/${method}/${file}`));
    }
}

// TODO: for ctrl
// CTRL ROUTES
for (const method of [ 'get' ]) {
    for (const file of getFiles(path.join(__dirname, `ctrl/${method}`)).map(file => file.slice(0, -3))) {
        app[method](`/${file.replace(/_/g, ':').replace('index', '')}`, require(`./ctrl/${method}/${file}`));
    }
}

const server = app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});

module.exports = server;
