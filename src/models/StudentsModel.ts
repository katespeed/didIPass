const studentsManager: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  let sumOfweight: number = 0;
  const { length } = weights.assignmentWeights;
  for (let i = 0; i < length; i += 1) {
    sumOfweight += weights.assignmentWeights[i].weight;
  }
  //   if(sumOfweight > 100){
  //     res.sendStatus(404);
  //   }
  return sumOfweight / length;
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
  const currentAverage: number = calculateAverage(weights);
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

export { studentsManager, addStudent, getStudent };
