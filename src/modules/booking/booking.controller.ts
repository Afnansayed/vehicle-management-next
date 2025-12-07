import { Request, Response } from "express";
import { bookingService } from "./booking.service";


const createBooking = async (req: Request, res: Response) => {
    try {
      const result = await bookingService.createBooking(req.body);
      res.status(201).json({
        success: true,
        message: 'Vehicle booked successfully',
        data: result.rows[0],
      });
    } catch (error:any) {
      res.status(500).json({
        success: false,
        message: error.message ||'Internal Server Error',
        error: error,
      });
    }
  };

export const bookingController ={
    createBooking
}  