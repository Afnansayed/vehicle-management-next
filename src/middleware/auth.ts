import { NextFunction, Request, Response } from "express"
import config from "../config";
import  jwt, { JwtPayload }  from 'jsonwebtoken';


const auth = (...roles: string[]) => {
      return async (req:Request ,res:Response, next:NextFunction) => {
           try{
               const token = req.headers.authorization?.split(' ')[1];
               if(!token){
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                })
               }
               const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
               req.user = decoded;

               console.log(decoded);

               if(roles.length > 0 && !roles.includes(decoded.role)){
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden'
                })
               }
               next();
           }catch(err:any){
            console.log(err);
            res.status(500).json({
                success: false,
                message: err.message
            })
           }
      }
}

export default auth;