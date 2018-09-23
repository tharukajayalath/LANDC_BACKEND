const express = require('express');
const app = express();
const config = require('./config');
const FILE = require('path').basename(__filename);
const logger = require('./logger').getLogger({},{fileName: FILE});

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

app.use(bodyParser.json());
app.use(cors());
app.use('/user', userRoutes);
app.use('/order', orderRoutes);
app.use('/admin', adminRoutes);
app.use(express.static(buildDir));
app.get('*', (req,res)=>{
    logger.info('serving admin portal');
    sendAdminHome(res);
});



const server = app.listen(config.PORT, () => {
    logger.info('App is listening on ', config.HOST, ":", config.PORT);
});

/*
process.on('SIGINT', () => {
    console.info('SIGINT signal received.');
    server.close();
});
*/

