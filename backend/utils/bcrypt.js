const bcrypt = require('bcrypt');

const saltRounds = 10;

// Hash a password
const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
};

// Compare a password with its hash
const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

module.exports = { hashPassword, comparePassword };