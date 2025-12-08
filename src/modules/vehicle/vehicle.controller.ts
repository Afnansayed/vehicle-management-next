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
const getVehicles = async (req: Request, res: Response) => {
    try {
        const result = await  vehicleService.getVehicles();
        res.status(200).json({
          success: true,
          message: 'Vehicles retrieved successfully',
          data: result.rows,
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

    const getVehicleById = async (req: Request, res: Response) => {
        try {
            const result = await  vehicleService.getVehicleById(req.params.vehicleId as string);
            res.status(200).json({
              success: true,
              message: 'Vehicle retrieved successfully',
              data: result.rows,
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

        const updateVehicle = async (req: Request, res: Response) => {
            try {
                const result = await  vehicleService.updateVehicle( req.body ,req.params.vehicleId as string);
                res.status(200).json({
                  success: true,
                  message: 'Vehicle update successfully',
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

            const deleteVehicle = async (req: Request, res: Response) => {
              try {
                  const result = await  vehicleService.deleteVehicle(req.params.vehicleId as string);
                  res.status(200).json({
                    success: true,
                    message: 'Vehicle deleted successfully',
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
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
}