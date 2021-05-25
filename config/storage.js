const { URL } = require('url');

module.exports = {
    /** Chose your option, MongoDb OR Azure blob + table */
    /** Connection Config form mongoDb */
    MONGO_URI: 'mongodb+srv://whatsapp:i6PErxnOJ2v3xAVK@cluster0.7ptbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', //process.env.STORAGE_MONGO_URI,
    MONGO_DB_NAME: 'mongodb+srv://whatsapp:i6PErxnOJ2v3xAVK@cluster0.7ptbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' && (new URL('mongodb+srv://whatsapp:i6PErxnOJ2v3xAVK@cluster0.7ptbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')).pathname.replace('/', ''), 
};