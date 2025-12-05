import { Request, Response } from 'express';
import { userService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
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

const getUsers = async (req: Request, res: Response) => {
  try{
     const result = await userService.getUsers();
     res.status(200).json({
      success: true,
      message: 'User derived successfully',
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
  createUser,
  getUsers
};
