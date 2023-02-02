import { Request, Response } from 'express';
import { students, addStudent, getStudent } from '../models/StudentsModel';

function getAllStudents(req: Request, res: Response): void {
  res.json(students);
}

// function createNewStudent(req: Request, res: Response): void {

//     const studentData = // Assign `req.body` as a `NewStudentRequest`

//     const didAddStudent = addStudent(studentData)// Call the `addStudent` function using the student's data

//     // If the student's data was not added successfully
//       // Responds with status 409 (This means 409 Conflict)
//       // return from the function

//     // Send status 201 (This means 201 Created)
// }

export default { getAllStudents, addStudent, getStudent };
