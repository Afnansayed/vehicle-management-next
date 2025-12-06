import { Request, Response } from "express";
import { authServices } from "./auth.service";


const signUp = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signUp(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error,
    });
  }
};


const signIn = async (req: Request, res: Response) => {
    try{
       const result = await authServices.signIn(req.body);
       res.status(200).json({
        success: true,
        message: 'Login successful',
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
    signIn,
    signUp
}  