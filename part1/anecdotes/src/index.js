import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}


const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
    const [mostVoted, setMostVoted] = useState(0)

    const getRandomInt = (max) => {
        const int = Math.floor(Math.random() * Math.floor(max))
        console.log('random int:', int)
        return int
    }

    const updateSelected = () => {
        setSelected(getRandomInt(anecdotes.length))
    }

    const addVote = () => {
        const pointsCopy = [...points]
        pointsCopy[selected] += 1
        setPoints([...pointsCopy])
    }

    useEffect(() => {
        setMostVoted(points.indexOf(Math.max(...points)))
    }, [points])

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <p>has {points[selected]} votes</p>
            <Button text="vote" handleClick={addVote} />
            <Button text="next anecdote" handleClick={updateSelected} />
            <h2>Anecdote with most votes</h2>
            <p>{anecdotes[mostVoted]}</p>
            <p>has {points[mostVoted]} votes</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)