const { USER_LOGIN_DETAILS } = require("../config/constants");

const getRoleByUsername = (username) => {
    return USER_LOGIN_DETAILS[username]['role'];
};

module.exports = getRoleByUsername;