import { pool } from '../../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';

const signIn = async (payload: Record<string, unknown>) => {
  const { email, password } = payload;

  const getUserByEmail = await pool.query(
    `SELECT * FROM users WHERE email=$1`,
    [email]
  );

  const user = getUserByEmail.rows[0];
  console.log(user);

  if (!user) {
    throw new Error('User not found!');
  }

  const match = await bcrypt.compare(password as string, user.password);
  console.log(match);

  if (!match) throw new Error('Password not match!');

  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
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
};
