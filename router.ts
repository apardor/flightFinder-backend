import { Router } from "express";
import { readAllFlights, readConnections,readSchedule } from "./controllers";

const router = Router();

router.get('/', readAllFlights);
router.get('/flights', readConnections)
router.get('/schedule', readSchedule)


export default router;