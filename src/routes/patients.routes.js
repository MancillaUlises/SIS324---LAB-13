import { Router} from "express";
import {getPatients,
    createPatient,
    updatePatient,
    getPatient,
    deletePatient} from '../controllers/patient.controller.js';

const router=Router();

//Routes
router.post("/", createPatient);
router.get("/", getPatients);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);
router.get("/:id", getPatient);

export default router;