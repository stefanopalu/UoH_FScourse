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

  export { Course, Header, Part, Content };
