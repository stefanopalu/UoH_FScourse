const Header = ({name}) => {
    return (
    <div>
      <h1>{name}</h1>
    </div>
    )
  }
  
  const Part = ({part}) => {
    console.log("part name is", part.name)
    return (
        <li>{part.name} {part.exercises}</li>
    )
  }
  
  const Content = ({parts}) => {
    console.log("parts are", parts)
    return (
      <ul>
        {parts.map(part =>
          <Part key={part.id} part={part}/>
        )}
      </ul>
    )
  }
  
  const Total = ({parts}) => {
    const totalex = parts.map(part => part.exercises)
    const total = totalex.reduce((x,y) => x+y)
    console.log("exercise are", totalex)
    return (
    <div>
        <p>total of {total} exercises</p>
    </div>
    )
  }
  
  const Course = ({course}) => {
    console.log(course.parts)
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export {Course, Header, Content, Part, Total}