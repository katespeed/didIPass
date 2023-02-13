import { Request, Response } from 'express';
import {
  studentsManager,
  addStudent,
  getStudent,
  calculateFinalExamScore,
  getLetterGrade,
  updateStudentGrade,
} from '../models/StudentsModel';

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

function getFinalExamScores(req: Request, res: Response): void {
  // TODO: Get the student name from the path params
  // TODO: Get the student's data from the dataset
  const { studentName } = req.params as StudentNameParams;
  const student = getStudent(studentName);
  // TODO: If the student was not found
  // TODO: responds with status 404 Not Found
  // TODO: terminate the function
  if (!student) {
    res.sendStatus(404);
    return;
  }
  // TODO: Get the current average and weights from the student's data
  // TODO: Calculate the grade needed on the final to score a 90 in the class (this is the grade needed for an A)
  // TODO: Calculate the grade needed on the final to score a 80 in the class (this is the grade needed for a B)
  // TODO: Calculate the grade needed on the final to score a 70 in the class (this is the grade needed for a C)
  // TODO: Calculate the grade needed on the final to score a 60 in the class (this is the grade needed for a D)
  const neededForA: number = calculateFinalExamScore(
    student.currentAverage,
    student.weights.finalExamWeight.weight,
    90
  );
  const neededForB: number = calculateFinalExamScore(
    student.currentAverage,
    student.weights.finalExamWeight.weight,
    80
  );
  const neededForC: number = calculateFinalExamScore(
    student.currentAverage,
    student.weights.finalExamWeight.weight,
    70
  );
  const neededForD: number = calculateFinalExamScore(
    student.currentAverage,
    student.weights.finalExamWeight.weight,
    60
  );
  console.log();
  const scores: FinalExamScores = { neededForA, neededForB, neededForC, neededForD };
  // TODO: Send a JSON response with an object containing the grades needed for an A through D
  res.json(scores);
}

function calcFinalScore(req: Request, res: Response): void {
  // TODO: Get the student name from the path params
  // TODO: Get the student's data from the dataset
  const { studentName } = req.params as StudentNameParams;
  const student = getStudent(studentName);
  // TODO: If the student was not found
  // TODO: responds with status 404 Not Found
  // TODO: terminate the function
  if (!student) {
    res.sendStatus(404);
    return;
  }
  // TODO: Get the grade data from the request body as the `AssignmentGrade` type
  const gradeData = req.body as AssignmentGarde;
  // TODO: Get the current average and weights from the student's data
  const { currentAverage } = student;
  const weight = student.weights;
  // TODO: Calculate the final score that would receive using their current average and the hypothetical final exam grade.
  const overallScore =
    (weight.finalExamWeight.weight / 100) * gradeData.grade +
    (1 - weight.finalExamWeight.weight / 100) * currentAverage;
  // TODO: Get the letter grade they would receive given this score
  const letterGrade = getLetterGrade(overallScore);
  // TODO: Send back a JSON response containing their `overallScore` and `letterGrade.
  const finalGrade: FinalGrade = { overallScore, letterGrade };
  res.json(finalGrade);
}

function updateGrade(req: Request, res: Response): void {
  // TODO: Get the student's name and assignment name from the path parameters as a `GradeUpdateParams`
  const { studentName, assignmentName } = req.params as GradeUpdateParams;
  // TODO: Get the grade from the request body as an `AssignmentGrade`
  const { grade } = req.body as AssignmentGarde;
  // TODO: Update the student's grade
  // TODO: If the update did not complete (this means the student or the assignment wasn't found)
  if (!updateStudentGrade(studentName, assignmentName, grade)) {
    // TODO: respond with status 404 Not Found
    // TODO: terminate the function immediately
    res.status(404);
    return;
  }
  // TODO: Respond with status 200 OK
  const student = getStudent(studentName);
  res.json(student);
  res.status(202);
}

export default {
  getAllStudents,
  createNewStudent,
  getStudentByName,
  getFinalExamScores,
  calcFinalScore,
  updateGrade,
};
