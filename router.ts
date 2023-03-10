import { Router } from "express";
import { readAllFlights, readConnections, readSchedule, booking } from "./controllers";

const router = Router();

router.get('/', readAllFlights);
router.get('/flights', readConnections)
router.get('/schedule', readSchedule)
router.get('/book', booking)


export default router;