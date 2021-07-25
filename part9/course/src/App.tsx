import React from 'react';

interface HeaderProps {
  name: string
}

const Header = ({ name }: HeaderProps) => {
  return <h1>{name}</h1>
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescriptionPart extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescriptionPart {
  type: "special";
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.type) {
    case "normal":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <span><i>{part.description}</i></span>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <span>project exercises: {part.groupProjectCount}</span>
        </div>
      );
    case "submission":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <span><i>{part.description}</i></span><br/>
          <span>submit to: {part.exerciseSubmissionLink}</span>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <span><i>{part.description}</i></span><br/>
          <span>required skills: {part.requirements.map(r => r).join(", ")}</span>
        </div>
      )
    default:
      return assertNever(part);
  }
}

const Content = (props: { parts: CoursePart[] }): JSX.Element => {
  const parts = props.parts.map(part => <Part key={part.name} part={part} />);
  return <div>{parts}</div>;
}

const Total = ({ parts }: { parts: CoursePart[] }) => {
  const total = parts.reduce((carry, part) => carry + part.exerciseCount, 0);
  return <p>Number of exercises {total}</p>;
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];  

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;