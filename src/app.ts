import express, { Request, Response } from 'express';
import initDB from './config/db';
import { userRoutes } from './modules/user/user.routes';
import { authRouters } from './modules/auth/auth.routes';
import { vehicleRoutes } from './modules/vehicle/vechicle.routes';
import { bookingRouters } from './modules/booking/booking.routes';

const app = express();

// parser middleware
app.use(express.json());

// initialize database
initDB();

// routes
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running ...');
});

//user
app.use('/api/v1/users', userRoutes);

//authentication
app.use('/api/v1/auth' , authRouters);

//Vehicle routes
app.use('/api/v1/vehicles' , vehicleRoutes);

//bookings 
app.use('/api/v1/bookings' , bookingRouters);

// handle 404 errors
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
  });
});

export default app;
