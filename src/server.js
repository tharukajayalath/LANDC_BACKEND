const express = require('express');
const app = express();
const config = require('./config');
const FILE = require('path').basename(__filename);
const logger = require('./logger').getLogger({},{fileName: FILE});
const objectConstant = require('./api/constant/objectConstants');
const bodyParser = require('body-parser');

const cacheUtil = require('./api/util/cacheUtil');
const dbUtil = require('./api/util/dbUtil');
const userRoutes = require('./api/routes/userRoutes');
const orderRoutes = require('./api/routes/orderRoutes');

app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/order', orderRoutes);


/*



// app.use('/user', userRoutes);

app.get('/', (req, res) => {
    logger.debug('/ path called');
    logger.info('Path is :', process.env.PATH || 'not found a path in the system');
    // cacheUtil.set('test_1',{name: "tharuka", age: 25});
    logger.debug(cacheUtil.get('test_1'));
    logger.debug(cacheUtil.get('test_2'));

    res.send('Hello World!');
});

app.get('/test/dbconn',async (req,res)=>{outes

    try{
        const result = await dbUtil.executeQuery('');
        res.send(result);

    }catch (e) {
        res.send(e);
    }
});

app.get('/test/create/customer', async(req, res)=>{

    try{
        const result = await dbUtil.createCustomer({
            'email': 'tharukaboss9@gmail.com',
            'contactNumber': '0712687005',
            'name': 'Tharuka Jayalath',
            'address': 'Sanasuma, Wewalagma, Kumbukwewa'
        });

        logger.info(result);
        res.send(result);
    }catch (e) {
        logger.error(e);
        res.send(e);
    }


});
*/

app.listen(config.PORT, () => {
    logger.info('App is listening on ', config.HOST, ":", config.PORT);
});
