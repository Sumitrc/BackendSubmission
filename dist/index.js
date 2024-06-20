"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const submission_1 = __importDefault(require("./routes/submission"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json());
app.use('/api', submission_1.default);
app.get('/ping', (req, res) => {
    res.json(true);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
