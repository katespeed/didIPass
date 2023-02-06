import express, { Express } from 'express';
import StudentController from './controllers/StudentController';

const app: Express = express();
const PORT = 8019;

app.use(express.json());

// function handlelistenevent(): void {
//     console.log(`Server listening on http://localhost:${PORT}`);
// };

// app.listen(PORT, handlelistenevent);

app.get('/api/students', StudentController.getAllStudents);
app.post('/api/students', StudentController.createNewStudent);
app.get('/api/students/:studentName', StudentController.getStudentByName);
// GET http://localhost:8019/api/customer/Keito //(WildCard)
// app.get('/api/students/Keito Yamakawa', StudentController.getStudentByName);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
