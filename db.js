require('dotenv').config();
const { connect } = require('mongoose');

const databaseConnection = async () => {
    try {
        await connect(process.env.MONGO_URL);
        console.log('Database Connected')

    } catch (error) {
        logger.error("MongoDB Connection Error : ", error);
        return;
    }
};

module.exports = databaseConnection;

