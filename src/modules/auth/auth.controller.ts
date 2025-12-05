import { Request, Response } from "express";
import { authServices } from "./auth.service";


const signIn = async (req: Request, res: Response) => {
    try{
       const result = await authServices.signIn(req.body);
       res.status(200).json({
        success: true,
        message: 'User login successfully',
        data: result,
      });
    }catch (error:any) {
        console.log(error);
      res.status(500).json({
        success: false,
        message: error.message ||'Internal Server Error',
        error: error,
      });
    }
  }

export const authController = {
    signIn
}  