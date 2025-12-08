import { Request, Response } from 'express';
import { userService } from './user.service';

const getUsers = async (req: Request, res: Response) => {
  try{
     const result = await userService.getUsers();
     res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: result.rows,
    });
  }catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error,
    });
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }
      
      const result = await  userService.updateUser( req.body , req.params.userId as string , req.user);
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
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

  const deleteUser = async (req: Request, res: Response) => {
    try {
 
        
        const result = await  userService.deleteUser(req.params.userId as string);
        res.status(200).json({
          success: true,
          message: 'User deleted successfully',
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

export const userController = {
  getUsers,
  updateUser,
  deleteUser
};
