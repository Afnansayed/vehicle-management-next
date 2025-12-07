import { pool } from '../../config/db';


const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
}

const updateUser = async (payload: Record<string, any>, userId: string, userInfo: Record<string, any>) => {
  const { name, email, password, phone, role } = payload;
  const { role: jwtUserRole, id:jwtId } = userInfo;
// console.log({jwtUserRole: jwtUserRole , jwtId:jwtId , userId:userId});
  if (jwtUserRole !== "admin" && jwtId !== Number(userId)) {
    throw new Error("You can only update your own profile");
  }
  if (jwtUserRole !== "admin" && role !== undefined) {
    throw new Error("Only admin can change user role");
  }

  const result = await pool.query(`
    UPDATE users SET name = COALESCE($1, name), email = COALESCE($2 , email), password = COALESCE($3, password), phone = COALESCE($4, phone), role = COALESCE($5, role) WHERE id = $6 RETURNING *
    `,[name || null, email || null, password || null, phone || null,role || null , userId]);

    if(result.rows.length === 0) throw new Error('User not found!');

    return result;
}


export const userService = {
  getUsers,
  updateUser
};
