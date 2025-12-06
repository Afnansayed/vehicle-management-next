import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";


const createVehicle = async (req: Request, res: Response) => {
    try {
        const result = await  vehicleService.createVehicle(req.body);
        res.status(201).json({
          success: true,
          message: 'Vehicle listed successfully',
          data: result.rows[0],
        });
      } catch (error:any) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: error.message ||'Internal Server Error',
          error: error,
        });
      }

    }


export const vehicleController = {
    createVehicle
}