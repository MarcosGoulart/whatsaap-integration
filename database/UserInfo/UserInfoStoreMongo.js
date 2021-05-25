// @ts-check
const log = require('loglevel');
const { inspect } = require('util');

/**
 * @typedef {import('./IUserInfoStore').IUserInfoStore} IUserInfoStore
 * @typedef {import('./IUserInfo').IUserInfo} IUserInfo
 * @typedef {import('mongodb').Db} Db
 */

/**
 * @template T
 * @typedef {import('mongodb').UpdateQuery<T>} UpdateQuery<T>
 */

/**
 * @implements {IUserInfoStore}
 */
// @ts-ignore
module.exports = class UserInfoStoreMongo {
    /**
     * @param {Promise<Db>} dbClient
     */
    constructor(dbClient, collectionName) {
        this._dbClient = dbClient;
        this._collectionName = collectionName;
    }

    async _getCollection() {
        const db = await this._dbClient;
        return await db.collection(this._collectionName);
    }

    /**
     * @param {IUserInfo} userInfo
     */
    async updateOrInsert(userInfo) {
        try {
            const col = await this._getCollection();
            let user = this.getByNumber(userInfo.number);
            if(user){
                await col.updateOne({number: userInfo.number}, {$set: userInfo}, { upsert: true });

            }else{
                await col.insertOne(userInfo);
            }
            return true;
        } catch (err) {
            log.error('Failed creating UserInfo ' + inspect(err));
            return false;
        }
    }

    /**
     * @param {string} number
     * @returns {Promise<IUserInfo>}
     */
    async getByNumber(number) {
        try {
            const col = await this._getCollection();
            return await col.findOne({ number });
        } catch (err) {
            log.error('Failed getting UserInfo');
            return undefined;
        }
    }
};
