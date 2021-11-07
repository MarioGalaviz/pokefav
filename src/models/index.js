require('dotenv').config();

import { Pool } from 'pg';

const isProduction = process.env.NODE_ENV === 'production';



const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`


const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction,
  })

pool.on('error', function (err) {
winston.error('idle client error', err.message, err.stack)
})

export function query(text, params, callback) {
    return pool.query(text, params, callback);
}