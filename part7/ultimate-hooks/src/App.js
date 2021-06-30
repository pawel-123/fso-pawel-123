  
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    return response.data
  }

  const service = {
    setResources,
    getAll, 
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  useEffect(() => {
    const getNotes = async () => {
      const allNotes = await noteService.getAll()
      noteService.setResources(allNotes)
    }
    getNotes()
  }, [])

  useEffect(() => {
    const getPersons = async () => {
      const allPersons = await personService.getAll()
      personService.setResources(allPersons)
    }
    getPersons()
  }, [])

  const handleNoteSubmit = async (event) => {
    event.preventDefault()
    const newNote = await noteService.create({ content: content.value})
    noteService.setResources(notes.concat(newNote))
    content.reset()
  }
 
  const handlePersonSubmit = async (event) => {
    event.preventDefault()
    const newPerson = await personService.create({ name: name.value, number: number.value})
    personService.setResources(persons.concat(newPerson))
    name.reset()
    number.reset()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App