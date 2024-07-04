require("dotenv").config();

const cors = require('cors');

const port = process.env.PORT;
console.log('port=', port);
const databaseConnection = require('./db');
const express = require("express");
const app = express();
const ProductRouter = require('./router/Product')
const UserRouter = require('./router/User')
const OrderRouter = require('./router/Order')
app.use(cors());
app.use(express.json());
app.use('/products', ProductRouter)
app.use('/users',  UserRouter)
app.use('/Order',OrderRouter)



//-----------Connecting Database and start server---------
app.listen(port, () => {

    console.log(`App listening on the port ${port} Link : http://localhost:${port}`);
    databaseConnection();

    console.log(`Database on Running`);

})