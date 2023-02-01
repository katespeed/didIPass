import express, { Express } from 'express';
import { notImplemented } from './controllers/NotImplementedController';

const app: Express = express();
const PORT = 8019;

// function handlelistenevent(): void {
//     console.log(`Server listening on http://localhost:${PORT}`);
// };

// app.listen(PORT, handlelistenevent);

app.get('/api/students', notImplemented);
app.post('/api/students', notImplemented);
// GET http://localhost:8019/api/customer/Keito //(WildCard)
app.get('/api/students/:studentName', notImplemented);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
