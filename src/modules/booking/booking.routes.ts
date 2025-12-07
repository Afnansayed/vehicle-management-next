import express from 'express';
import { bookingController } from './booking.controller';
import auth from '../../middleware/auth';

const router = express.Router();


router.post('/' , auth('admin', 'customer'), bookingController.createBooking);
router.get('/' , auth('admin', 'customer'), bookingController.getBookings);


export const bookingRouters = router;


