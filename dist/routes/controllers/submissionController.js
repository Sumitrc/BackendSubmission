"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubmission = exports.submitForm = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.join(__dirname, '../db.json');
const submitForm = (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }
    const newSubmission = { name, email, phone, github_link, stopwatch_time };
    let submissions = [];
    if (fs_1.default.existsSync(dbPath)) {
        const data = fs_1.default.readFileSync(dbPath, 'utf-8');
        submissions = JSON.parse(data);
    }
    submissions.push(newSubmission);
    fs_1.default.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));
    res.status(201).json(newSubmission);
};
exports.submitForm = submitForm;
const getSubmission = (req, res) => {
    const index = parseInt(req.query.index, 10);
    if (isNaN(index)) {
        return res.status(400).json({ error: 'Invalid index.' });
    }
    if (!fs_1.default.existsSync(dbPath)) {
        return res.status(404).json({ error: 'No submissions found.' });
    }
    const data = fs_1.default.readFileSync(dbPath, 'utf-8');
    const submissions = JSON.parse(data);
    if (index < 0 || index >= submissions.length) {
        return res.status(404).json({ error: 'Submission not found.' });
    }
    res.json(submissions[index]);
};
exports.getSubmission = getSubmission;
