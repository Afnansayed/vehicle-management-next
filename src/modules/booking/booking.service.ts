import { pool } from "../../config/db";

const calculateDays = (start: string, end: string): number => {
  return Math.ceil(
    (new Date(end).getTime() - new Date(start).getTime()) /
      (1000 * 60 * 60 * 24)
  );
};

const createBooking = async (payload: Record<string, any>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  //*vehicle availablity check
  const getVehicles = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    vehicle_id,
  ]);
  const vehiclesInfo = getVehicles.rows[0];
  if (!vehiclesInfo) throw new Error("Vehicle not found!");
  // console.log(vehiclesInfo);
  if (vehiclesInfo.availability_status === "booked")
    throw new Error("Currently vehicle  is not available for now!");

  //*calculation
  const days = calculateDays(rent_start_date, rent_end_date);
  // console.log(days);
  const totalPrice = days * vehiclesInfo.daily_rent_price;
  // console.log(totalPrice);

  const result = await pool.query(
    `INSERT INTO bookings (customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalPrice,
      "active",
    ]
  );

  if (result.rows.length > 0) {
    await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2`, [
      "booked",
      vehicle_id,
    ]);
  }
  return result;
};

//* get
const getBookings = async (jwtRole: string, jwtId: number) => {
  let result;
  if (jwtRole === "customer") {
    result = await pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [
      jwtId,
    ]);
    if (result.rows.length <= 0) {
      throw new Error("No booking avilable.!");
    }
  } else {
    result = await pool.query(`SELECT * FROM bookings`);
  }

  return result;
};

//* updata status
const updateStatus = async (
  jwtRole: string,
  jwtId: number,
  bookingId: string,
  payload: Record<string, any>
) => {
  const { status } = payload;
  const bookingDetails = await pool.query(
    `SELECT * FROM bookings WHERE id=$1`,
    [bookingId]
  );
   const bookingStartDa = bookingDetails.rows[0].rent_start_date;


  let result;

  if (jwtRole === "customer") {
    if (status !== "cancelled")
      throw new Error("You can only update status with value (cancelled)");
    
    const today = new Date();
    const startDate = new Date(bookingStartDa);
    
    if (today >= startDate) {
      throw new Error('Cannot cancel booking after start date');
    }

    result = await pool.query(
      `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
      [status, bookingId]
    );
  }

  if (jwtRole === "admin") {
    result = await pool.query(
      `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
      [status, bookingId]
    );
  }

  return result;
};

export const bookingService = {
  createBooking,
  getBookings,
  updateStatus,
};
