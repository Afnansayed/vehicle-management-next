import express from 'express'
import { vehicleController } from './vehicle.controller';
import auth from '../../middleware/auth';

const router = express.Router();


router.post('/' , auth('admin'), vehicleController.createVehicle);
router.get('/', vehicleController.getVehicles);
router.get('/:vehicleId', vehicleController.getVehicleById);
router.put('/:vehicleId', auth('admin'), vehicleController.updateVehicle);

export const vehicleRoutes = router;