import { pool } from '../../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';


const signUp = async (payload: Record<string, any>) => {
  const { name, email , password, phone , role } = payload;

  const hashPass = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2,$3,$4,$5) RETURNING *`,
    [name, email, hashPass, phone, role]
  );
  return result;
};


const signIn = async (payload: Record<string, unknown>) => {
  const { email, password } = payload;

  const getUserByEmail = await pool.query(
    `SELECT * FROM users WHERE email=$1`,
    [email]
  );

  const user = getUserByEmail.rows[0];
  if (!user) {
    throw new Error('User not found!');
  }

  const match = await bcrypt.compare(password as string, user.password);

  if (!match) throw new Error('Password not match!');

  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role , id: user.id},
    config.jwt_secret as string,
    {
      expiresIn: '7d',
    }
  );

  return {
    token: token,
    user: user
  }
};

export const authServices = {
  signIn,
  signUp,
};
