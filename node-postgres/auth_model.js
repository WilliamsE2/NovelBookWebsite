
const config = require('./db.config.js');

const Pool = require('pg').Pool
const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.db,
  password: config.password,
  port: config.port,
});

const getUserPassword = (body) => {
    const { email } = body;
    return new Promise(function(resolve, reject) {
        pool.query('select u."password" from "user" u where u.email = $1;', [email], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    }) 
};

const getDuplicateEmail = (body) => {
    const { email } = body;
    return new Promise(function(resolve, reject) {
        pool.query('select u.email from "user" u where u.email = $1 and u.is_active = true;', [email], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    }) 
};

const createUser = (body) => {
    return new Promise(function(resolve, reject) {
        const { email, password, firstName, lastName, creationDate } = body;
        pool.query('insert into "user" (email, password, first_name, last_name, profile_pic_id, is_active, creation_date) values ($1, $2, $3, $4, 1, true, $5) returning *;', 
            [email, password, firstName, lastName, creationDate], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(`A new user has been registered: ${results.rows[0]}`);
        });
    })
};
  
module.exports = {
    getUserPassword, 
    getDuplicateEmail, 
    createUser
};
