import { Router} from "express";
import {getPays,
    createPay,
    updatePay,
    getPay,
    deletePay,
    getPayPeriod
} from '../controllers/pay.controller.js';

const router=Router();

//Routes
router.post("/", createPay);
router.get("/", getPays);
router.put("/:id", updatePay);
router.delete("/:id", deletePay);
router.get("/:id", getPay);
router.get("/:id/:startDate/:endDate",getPayPeriod)

export default router;