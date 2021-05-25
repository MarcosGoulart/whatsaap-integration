/**
 * Singleton MongoClient
 */

 const { storage } = require('../config');
 const { MongoClient } = require('mongodb');
 const log = require('loglevel');
 
 /**
  * @typedef {import('mongodb').Db} Db
  */
 
 /** @type {MongoClient} */
 let client;
 
 /** @type {Db} */
 let db;
 
 /**
  * Connects to Db and keep a single connection
  * @param {string} url
  * @param {string} dbName
  */
 const connect = async (url, dbName) => {
     try {
         close();
         client = await MongoClient.connect(
             url,
             {
                 useNewUrlParser: true,
                 useUnifiedTopology: true,
             },
         );
         db = client.db(dbName);
     } catch (e) {
         log.error('Failed connecting to mongoDb', e.message);
         client = null;
         db = null;
     }
 };
 
 const close = async () => {
     if (client) {
         await client.close();
         client = undefined;
         db = undefined;
     }
 };
 
 /**
  * Returns Mongo Db, if not connected will connect
  * @returns {Promise<Db>}
  */
 const getDb = async () => {
     if (!db) {
        await connect(storage.MONGO_URI, storage.MONGO_DB_NAME);
     }
     return db;
 };
 
 module.exports = {
     connect,
     close,
     getDb,
 };
 