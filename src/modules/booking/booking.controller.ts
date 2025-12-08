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

  const getBookings = async (req: Request, res: Response) => {
    try {
      const result = await bookingService.getBookings(req?.user?.role , req?.user?.id);
      res.status(200).json({
        success: true,
        message: 'Booking derived successfully',
        data: result.rows,
      });
    } catch (error:any) {
      res.status(500).json({
        success: false,
        message: error.message ||'Internal Server Error',
        error: error,
      });
    }
  };

  const updateBooking = async (req: Request, res: Response) => {
    try {
      const result = await bookingService.updateStatus(req?.user?.role , req?.user?.id , req.params.bookingId as string, req.body);
      res.status(200).json({
        success: true,
        message: 'Booking status updated successfully',
        data: result?.rows[0],
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
    createBooking,
    getBookings,
    updateBooking
}  