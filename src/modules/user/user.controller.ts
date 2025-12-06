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

export const userController = {
  getUsers
};
