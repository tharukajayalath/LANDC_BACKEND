const express = require('express');
const helmet = require('helmet');
const session= require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbUrl = require('../src/api/util/mongoUtil').getDBUrl();

const app = express();
const config = require('./config');
const FILE = require('path').basename(__filename);
const logger = require('./logger').getLogger({},{fileName: FILE});
logger.info('db url received', dbUrl);
// const objectConstant = require('./api/constant/objectConstants');
const bodyParser = require('body-parser');
const cors = require('cors');
const buildDir = require('path').resolve(__dirname, './build');
// console.log(staticDir);

// const cacheNUtil = require('./api/util/cacheUtil');
const userRoutes = require('./api/routes/userRoutes');
const orderRoutes = require('./api/routes/orderRoutes');
const adminRoutes = require('./api/routes/adminRoutes');

const sendAdminHome = (res) =>{
  res.sendFile(path.resolve(buildDir, 'index.html'));
};
const sendLogin = (res) =>{
  res.sendFile(path.resolve(buildDir, 'login.html'));
};

app.use(helmet());
app.use(bodyParser.json());
if(config.ENV !== 'production'){
    app.use(cors());
}
app.use('/user', userRoutes);
app.use('/order', orderRoutes);
app.use('/admin', adminRoutes);
app.use(express.static(buildDir));

app.use(session({
    cookie: {maxAge: config.MAX_AGE, secure: config.ENV === 'production',httpOnly : true},
    name: 'ADMIN_PORTAL',
    secret: config.SECRET,
    store: new MongoStore({url: dbUrl}),
    resave: false,
    saveUninitialized: false
}));

app.get('*', (req,res)=>{
    logger.info('serving admin portal');
    logger.info('req.session', req.session);
    if(req.session){
        sendLogin(res);
    }else{
        // sendLogin(res);
        sendAdminHome(res);
    }
});
app.listen(config.PORT, () => {
    logger.info('App is listening on ', config.HOST, ":", config.PORT);
});

/*
process.on('SIGINT', () => {
    console.info('SIGINT signal received.');
    server.close();
});
*/

