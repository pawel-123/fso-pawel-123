import React from 'react';

interface HeaderProps {
  name: string
}

const Header = ({ name }: HeaderProps) => {
  return <h1>{name}</h1>
}

interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Content = (props: { parts: CoursePart[] }): JSX.Element => {
  const parts = props.parts.map(part => <p key={part.name}>{part.name} {part.exerciseCount}</p>);
  return <div>{parts}</div>;
}

const Total = ({ parts }: { parts: CoursePart[] }) => {
  const total = parts.reduce((carry, part) => carry + part.exerciseCount, 0);
  return <p>Number of exercises {total}</p>;
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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