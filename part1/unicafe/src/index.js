import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const Statistic = ({ value, text }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = ({ good, bad, neutral }) => {
    const all = good + neutral + bad
    const average = (good * 1 + (bad * -1)) / all
    const positive = `${good * 1 / all * 100} %`

    if (all === 0) {
        return <p>No feedback given</p>
    } else {
        return (
            <table>
                <tbody>
                    <Statistic value={good} text="good" />
                    <Statistic value={neutral} text="neutral" />
                    <Statistic value={bad} text="bad" />
                    <Statistic value={all} text="all" />
                    <Statistic value={average} text="average" />
                    <Statistic value={positive} text="positive" />
                </tbody>
            </table>
        )
    }
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give value</h1>
            <Button handleClick={() => setGood(good + 1)} text="good" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />
            <h2>statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)