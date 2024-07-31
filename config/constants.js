const roles = {
    ADMIN: 'admin',
    USER: 'user'
};

const USER_LOGIN_DETAILS = {
    'usertest': {
        pwd: 'userpwd',
        role: roles.USER
    },
    'admintest': {
        pwd: 'adminpwd',
        role: roles.ADMIN
    }
};

module.exports = {
    ROLES: roles,
    USER_LOGIN_DETAILS
};