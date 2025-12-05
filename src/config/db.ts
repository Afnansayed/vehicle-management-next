import { Pool } from 'pg';
import config from '.';

export const pool = new Pool({
  connectionString: `${config.connectionString}`,
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL CHECK(email = LOWER(email)),
      password VARCHAR(250) NOT NULL CHECK(length(password) >= 6 ),
      phone VARCHAR(20) NOT NULL,
      role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'customer'))
    )
    `);
};

export default initDB;
