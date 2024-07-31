const jwt = require('jsonwebtoken');
const getRoleByUsername = require('./getRoleByUsername');

const jwtSign = (data) => {
    const { username } = data;
    const role = getRoleByUsername(username);
    return jwt.sign({ username, role }, process.env.JWT_SECRET);
};

module.exports = jwtSign;