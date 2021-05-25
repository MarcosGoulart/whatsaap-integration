const { userInfoFactory } = require('./UserInfo');

/** @type {import('./UserInfo/IUserInfoStore').IUserInfoStore} */
let userInfoStore;

const mongoClient = require('./mongoClient');
const { UserInfoStoreMongo } = require('./UserInfo');
userInfoStore = new UserInfoStoreMongo(mongoClient.getDb(), 'userInfo');

module.exports = {
    userInfoStore,
    userInfoFactory,
};
