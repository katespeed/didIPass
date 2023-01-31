type CourseGrade = {
    name: string;
    weight:	number;
    grade: number;
};

type CourseGrades = {
    assignmentWeights: CourseGrade;
    finalExamWeight: number;
};

type Student = {
    name: string;
    weights: CourseGrades;
    currentAverage: number;
}

type NewStudentsRequest = {
    name: string;
    weights: CourseGrades;
};

type AssignmentGarde = {
    grade: number;
};

type FinalGrade = {
    overallScore: number;
    letterGrade: string;
};

type finalExamScores = {
    neededForA:	number;
    neededForB:	number;
    neededForC:	number;
    neededForD:	number;
};