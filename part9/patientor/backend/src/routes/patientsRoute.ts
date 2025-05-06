import express, { Request, Response, NextFunction } from 'express';
import patientsService from '../services/patientsService';
import { NewPatientSchema, EntryWithoutIdSchema } from '../utils';
import { z } from 'zod';
import { Patient, NewPatient, Entry} from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getPatients()
  res.json(patients);
});

router.get('/:id', (req, res) => {
    const patient = patientsService.findById(req.params.id)

    if (patient) {
        res.send(patient)
    } else {
        res.sendStatus(404);
    }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        next()
    } catch (error: unknown) {
        next(error)
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error)
    }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.json(addedPatient);
});

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        EntryWithoutIdSchema.parse(req.body);
        next()
    } catch (error: unknown) {
        next(error)
    }
};


router.post('/:id/entries', newEntryParser, (req: Request, res: Response<Entry>) => {
    const id = req.params.id
    const entry = req.body
    const addedEntry = patientsService.addEntry(id, entry); 
    res.json(addedEntry); 
});

router.use(errorMiddleware)

export default router;