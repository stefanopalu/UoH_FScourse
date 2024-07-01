const Course = ({course}) =>{
  console.log(course.name)
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <p> total of {total} exercises</p>
    </div>
  )
}

const Header = ({name}) => {
  return (
  <h1>{name}</h1>
  )
}

const Part = ({ part }) => {
  console.log(part.name)
  return (
  <p>
    {part.name} {part.exercises}
  </p>
  )
}

const Content = ({ parts }) => {
  console.log(parts)
  return (
  <div>
    <ul>
      {parts.map(part => (
        <li key={part.id}>
          <Part part={part} />
        </li>
      ))}
    </ul>
  </div>
  ) 
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

export default App
