// @ts-check

/**
 * @typedef {import('./IUserInfo').IUserInfo} IUserInfo
 */

/**
 * @param {*} obj
 * @returns {IUserInfo}
 */
 const create = ({ number, sessionId='', key='', affinityToken='', clientPollTimeout='', profileName='', sequence = 1 }) => {
    if (!number) {
        throw new Error('Missing paramenter for userInfo');
    }
    return {
        number,
        sessionId,
        key,
        affinityToken,
        clientPollTimeout,
        profileName,
        sequence
    };
};

module.exports = {
    create,
};