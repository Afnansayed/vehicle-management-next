
import env from 'dotenv';
import path from 'path';

env.config({path: path.join(process.cwd(), '.env')})

const config = {
    port: process.env.PORT,
    connectionString: process.env.CONNECTION_STRING,
    jwt_secret: process.env.JWT_SECRETE
}

export default config;