import express from 'express';
import { submitForm, getSubmission } from './controllers/submissionController';

const router = express.Router();

router.post('/submit', submitForm);
router.get('/read', getSubmission);

export default router;
