import express from 'express';
import bodyParser from 'body-parser';
import submissionRoutes from './routes/submission';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api', submissionRoutes);

app.get('/ping', (req, res) => {
    res.json(true);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
