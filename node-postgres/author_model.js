const Pool = require('pg').Pool
const pool = new Pool({
  user: 'evan',
  host: 'localhost',
  database: 'bookdb',
  password: 'root',
  port: 5432,
});

const getAuthor = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM author ORDER BY author_id ASC', (error, results) => {
            if (error) {
            reject(error)
            }
            resolve(results.rows);
        })
    }) 
}

const createAuthor = (body) => {
    return new Promise(function(resolve, reject) {
        const { name, description } = body
        pool.query('INSERT INTO author (author_name, description) VALUES ($1, $2) RETURNING *', [name, description], (error, results) => {
            if (error) {
            reject(error)
            }
            resolve(`A new author has been added added: ${results.rows[0]}`)
        })
    })
}
  
const deleteAuthor = () => {
    return new Promise(function(resolve, reject) {
        const id = parseInt(request.params.id)
        pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Author deleted with ID: ${id}`)
        })
    })
}
  
module.exports = {
    getAuthor,
    createAuthor,
    deleteAuthor,
}
