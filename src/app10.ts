interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
  }
  
  function ceateCurseGoal(
    title: string,
    description: string,
    date: Date
  ): CourseGoal {
    const courseGoal: Partial<CourseGoal> = {};
  
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
  
    return courseGoal as CourseGoal;
  }
  
  const names: Readonly<string[]> = ["max", "sports"];
  // names.push("manu");
  // names.pop();
  