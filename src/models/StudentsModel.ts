const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  let sumOfweight: number = 0;
  const { length } = weights.assignmentWeights;
  for (let i = 0; i < length; i += 1) {
    sumOfweight += weights.assignmentWeights[i].weight;
  }
  return sumOfweight / length;
}

function addStudent(newStudentData: NewStudentRequest): boolean {
  // Destructure the name and weights
  const { name, weights } = newStudentData;

  // the the name is already in `students`
  if (name in students.name) {
    return false; // then return false
  }
  // Calculate the student's current average (use the function previously defined)
  const average: number = calculateAverage(weights);
  const newStudent: Student = {
    name: newStudentData.name,
    weights: newStudentData.weights,
    currentAverage: average,
  }; // Create a `Student` object using the `name`, `weights` and `currentAverage`
  console.log(newStudent);
  // Add the new Student to the `students` object. The student's name is the key
  students[newStudentData.name] = newStudent;
  // Finally, return true since the student was added
  return true;
}

function getStudent(studentName: string): Student | undefined {
  // If the student's name is not in `students`
  if (!(studentName in students.name)) {
    return undefined; // then return undefined
  }
  // Return the student's information (their name is the key for `students`)
  return students[studentName];
}

export { students, addStudent, getStudent };
