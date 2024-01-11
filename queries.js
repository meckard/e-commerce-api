const Pool = require('pg').Pool
const { PG } = require('../queries')


const pool = new Pool({
  user: PG.PGUSER,
  host: PG.PGHOST,
  database: PG.PGDATABASE,
  password: PG.PGPASSWORD,
  port: PG.PGPORT,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM public.user ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


module.exports = {
    getUsers
}