
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
        pool.query('select u."password" from "user" u where u.email = $1;', 
            [email], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    }) 
};

const createUser = (body) => {
    return new Promise(function(resolve, reject) {
        const { email, password, firstName, lastName } = body;
        pool.query('insert into "user" (email, password, first_name, last_name, profile_pic_id, is_active, creation_date) values ($1, $2, $3, $4, 1, true, current_timestamp) returning *;', 
            [email, password, firstName, lastName], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(`A new user has been registered: ${results.rows[0]}`);
        });
    })
};

const getDuplicateEmail = (body) => {
    const { email } = body;
    return new Promise(function(resolve, reject) {
        pool.query('select u.email from "user" u where u.email = $1 and u.is_active = true;', 
            [email], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    }) 
};

const getHomeBooks = () => {
    return new Promise(function(resolve, reject) {
        pool.query('select b.book_id, b.book_title, b.author_name from book b order by b.book_id asc limit 4;', 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    })
};

const getBook = (body) => {
    const { id } = body;
    return new Promise(function(resolve, reject) {
        pool.query('select b.book_title, b.author_name, b.publishing_date_display, b.page_count, g.genre_title, b.description from book b inner join genres g on g.genre_id = b.genre_id where b.book_id = $1;', 
            [id], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    }) 
};
  
module.exports = {
    getUserPassword, 
    createUser, 
    getDuplicateEmail, 
    getHomeBooks, 
    getBook
};
