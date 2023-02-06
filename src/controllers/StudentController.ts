import { Request, Response } from 'express';
import { studentsManager, addStudent, getStudent } from '../models/StudentsModel';

function getAllStudents(req: Request, res: Response): void {
  res.json(studentsManager);
}

function createNewStudent(req: Request, res: Response): void {
  const studentData = req.body as NewStudentRequest; // Assign `req.body` as a `NewStudentRequest`

  const didAddStudent = addStudent(studentData); // Call the `addStudent` function using the student's data

  // If the student's data was not added successfully
  // Responds with status 409 (This means 409 Conflict)
  // return from the function
  if (!didAddStudent) {
    res.sendStatus(409);
    return;
  }
  // res.sendStatus(201); // Send status 201 (This means 201 Created)
  res.json(req.body);
}

function getStudentByName(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParams; // Assign `req.params` as a `StudentNameParams`;
  const student = getStudent(studentName); // get the student's data using function imported from StudentModel
  // If `student` is undefined
  // respond with status 404 (Which means 404 Not Found)
  // return immediately
  if (!student) {
    res.sendStatus(404);
    return;
  }
  // Respond with the student's information as json
  res.json(student);
}

export default { getAllStudents, createNewStudent, getStudentByName };
