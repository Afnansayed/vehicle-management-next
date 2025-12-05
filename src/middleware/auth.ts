import { NextFunction, Request, Response } from "express"


const auth = () => {
      return async (req:Request ,res:Response, next:NextFunction) => {
           try{
             
           }catch(err:any){
            console.log(err);
            res.status(500).json({
                success: false,
                message: err.message
            })
           }
      }
}