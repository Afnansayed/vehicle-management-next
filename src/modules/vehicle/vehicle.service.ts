import { pool } from "../../config/db";

const createVehicle = async (payload: Record<string, any>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  if (
    !vehicle_name ||
    !type ||
    !registration_number ||
    !daily_rent_price ||
    !availability_status
  ) {
    throw new Error("Missing all required feilds");
  }

  const result = await pool.query(
    `
        INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *
        `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result;
};

const getVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};

const getVehicleById = async (vehicleId: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    vehicleId,
  ]);
  if (result.rows.length <= 0) {
    throw new Error("Vehicle not found");
  }
  return result;
};

const updateVehicle = async (
  payload: Record<string, any>,
  vehicle_id: string
) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `
    UPDATE vehicles SET vehicle_name = COALESCE($1, vehicle_name),  type = COALESCE($2, type), registration_number = COALESCE($3, registration_number), daily_rent_price = COALESCE($4, daily_rent_price), availability_status = COALESCE($5,availability_status)  WHERE id = $6 RETURNING *
    `,
    [
      vehicle_name || null,
      type || null,
      registration_number || null,
      daily_rent_price || null,
      availability_status || null,
      vehicle_id,
    ]
  );

  if (result.rows.length <= 0) {
    throw new Error("Vehicle not found");
  }

  return result;
};

//* delete
const deleteVehicle = async(vehicleId:string) => {
  let result ;
     const bookings = await pool.query(`SELECT * FROM bookings WHERE vehicle_id=$1`,[vehicleId]);
     if(bookings.rows.length === 0){
       result =  await pool.query(`DELETE FROM vehicles WHERE id=$1 RETURNING *`,[vehicleId]);
     }
     const isActive = bookings.rows.some(booking => booking.status === 'active');
    //  console.log({bookings: bookings?.rows ,isActive});
     if(isActive) throw new Error('Booking status is active! you are not able to delete this vehicle until booking status (active)')

     result =  await pool.query(`DELETE FROM vehicles WHERE id=$1 RETURNING *`,[vehicleId]);

     return result;
}

export const vehicleService = {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
};
