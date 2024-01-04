const bcrypt = require("bcrypt")
const validPassword = async function(password, db_pass){
    return bcrypt.compare(password, db_pass);
}

module.exports = validPassword