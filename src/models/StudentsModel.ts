const studentsManager: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  let average = 0;
  for (const grade of weights.assignmentWeights) {
    average += (grade.grade * grade.weight) / (100 - weights.finalExamWeight.weight);
  }
  return average;
}

function addStudent(newStudentData: NewStudentRequest): boolean {
  // Destructure the name and weights
  const { name, weights } = newStudentData;
  // the the name is already in `students`
  if (name in studentsManager) {
    return false; // then return false
  }
  // Calculate the student's current average (use the function previously defined)
  // Create a `Student` object using the `name`, `weights` and `currentAverage`
  const currentAverage = calculateAverage(weights);
  const newStudent: Student = { name, weights, currentAverage };
  studentsManager[name] = newStudent; // Add the new Student to the `students` object. The student's name is the key
  return true; // Finally, return true since the student was added
}

function getStudent(studentName: string): Student | undefined {
  // If the student's name is not in `students`
  if (!(studentName in studentsManager)) {
    return undefined; // then return undefined
  }
  // Return the student's information (their name is the key for `students`)
  return studentsManager[studentName];
}

function calculateFinalExamScore(
  currentAverage: number,
  finalExamWeight: number,
  targetScore: number
): number {
  // TODO: Calculate the final exam score needed to get the targetScore in the class
  return (targetScore - (1 - finalExamWeight / 100) * currentAverage) / (finalExamWeight / 100);
}

function getLetterGrade(score: number): string {
  // TODO: Return the appropriate letter grade
  if (score >= 90) {
    return 'A';
  }
  if (score < 90 && score >= 80) {
    return 'B';
  }
  if (score < 80 && score >= 70) {
    return 'C';
  }
  if (score < 70 && score >= 60) {
    return 'D';
  }
  return 'F';
}

function updateStudentGrade(
  studentName: string,
  assignmentName: string,
  newGrade: number
): boolean {
  // TODO: Get the student name from the path params
  // TODO: Get the student's data from the dataset
  const student = getStudent(studentName);
  // TODO: If the student was not found
  if (!student) {
    return false; // TODO: return false
  }
  // TODO: Search the student's `assignmentWeights` and find the assignment with the matching name using the .find() method
  const assignment = student.weights.assignmentWeights.find(
    (element) => element.name === assignmentName
  );
  // TODO: If the assignment was not found
  // TODO: return false
  if (!assignment) {
    return false;
  }
  // TODO: Set the assignment's grade to the newGrade
  const index = student.weights.assignmentWeights.findIndex(
    (element) => element.name === assignmentName
  );
  student.weights.assignmentWeights[index].grade = newGrade;

  // TODO: Then recalculate the student's currentAverage
  student.currentAverage = calculateAverage(student.weights);
  // TODO: return true since the update completed successfully
  return true;
}

export {
  studentsManager,
  addStudent,
  getStudent,
  calculateFinalExamScore,
  getLetterGrade,
  calculateAverage,
  updateStudentGrade,
};
