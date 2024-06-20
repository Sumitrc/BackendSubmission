"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const submissionController_1 = require("./controllers/submissionController");
const router = express_1.default.Router();
router.post('/submit', submissionController_1.submitForm);
router.get('/read', submissionController_1.getSubmission);
exports.default = router;
