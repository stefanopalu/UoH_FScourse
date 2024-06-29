import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={() => props.onClick()}>
      {props.text}
    </button>
  )
}

const Display = (props) => {
  return (
    <div>{props.text} {props.counter}</div>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <h1>statistics</h1>
      <div>good {props.good}</div>
      <div>neutral {props.neutral}</div>
      <div>bad {props.bad}</div>
      <div>all {props.all}</div>
      <div>average {(props.good*1+props.bad*-1)/props.all}</div>
      <div>positive {(props.good/props.all)*100} %</div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const goodClick = () => {
    setAll(allClicks.concat(1))
    setGood(good + 1)
  }

  const neutralClick = () => {
    setAll(allClicks.concat(0))
    setNeutral(neutral + 1)
  }

  const badClick = () => {
    setAll(allClicks.concat(-1))
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => goodClick()} text="good"/>
      <Button onClick={() => neutralClick()} text="neutral"/>
      <Button onClick={() => badClick()} text="bad"/>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={allClicks.length}
      />
    </div>
  )
}

export default App