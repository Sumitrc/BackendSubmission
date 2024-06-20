import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(__dirname, '../db.json');

interface Submission {
    name: string;
    email: string;
    phone: string;
    github_link: string;
    stopwatch_time: string;
}

export const submitForm = (req: Request, res: Response) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }

    const newSubmission: Submission = { name, email, phone, github_link, stopwatch_time };
    let submissions: Submission[] = [];

    if (fs.existsSync(dbPath)) {
        const data = fs.readFileSync(dbPath, 'utf-8');
        submissions = JSON.parse(data);
    }

    submissions.push(newSubmission);
    fs.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));

    res.status(201).json(newSubmission);
};

export const getSubmission = (req: Request, res: Response) => {
    const index = parseInt(req.query.index as string, 10);

    if (isNaN(index)) {
        return res.status(400).json({ error: 'Invalid index.' });
    }

    if (!fs.existsSync(dbPath)) {
        return res.status(404).json({ error: 'No submissions found.' });
    }

    const data = fs.readFileSync(dbPath, 'utf-8');
    const submissions: Submission[] = JSON.parse(data);

    if (index < 0 || index >= submissions.length) {
        return res.status(404).json({ error: 'Submission not found.' });
    }

    res.json(submissions[index]);
};
